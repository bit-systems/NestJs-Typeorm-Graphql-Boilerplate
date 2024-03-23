import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request: Request;

    const isAllowUnauthorizedRequest = this.reflector.get(
      'allowUnauthorizedRequest',
      context.getHandler(),
    );

    if (isAllowUnauthorizedRequest) {
      return true;
    }
    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest();
    } else {
      request = this.getRequest(context);
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Not Authenticated');
    }
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      // TODO verify user from DB
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Not Authenticated');
    }
    return true;
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Could not authenticate with token')
      );
    }
    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
