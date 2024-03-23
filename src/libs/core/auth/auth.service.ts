import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@src/libs/db/entities';

import { jwtExpiration } from '../utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createJwt(user: UserEntity): { token: string } {
    const data = {
      id: user.id,
      fullName: user.fullName,
    };

    const jwt = this.jwtService.sign(data, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: jwtExpiration,
    });
    return {
      token: jwt,
    };
  }
}
