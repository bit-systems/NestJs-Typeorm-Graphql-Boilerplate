import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '@src/libs/core/auth/auth.service';
import { DefaultStatus } from '@src/libs/core/utils';
import { UserEntity } from '@src/libs/db/entities';
import * as bcrypt from 'bcrypt';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { AdminLoginInput } from './dto/admin-login.input';
import { GqlUserWithToken } from './dto/user.outputs';

@Injectable()
export class UserService {
  constructor(
    private logger: PinoLogger,

    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async login(inputs: AdminLoginInput): Promise<GqlUserWithToken> {
    const user = await this.usersRepository.findOne({
      where: {
        email: inputs.email,
        status: DefaultStatus.ACTIVE,
      },
    });

    if (!user) {
      throw new BadRequestException('email or password is incorrect');
    }

    const isMatch = bcrypt.compareSync(inputs.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('email or password is incorrect');
    }

    const userWithToken = new GqlUserWithToken();
    userWithToken.id = user.id;
    userWithToken.token = this.authService.createJwt(user).token;
    userWithToken.fullName = user.fullName;
    return userWithToken;
  }

  async profile(user: UserEntity): Promise<GqlUserWithToken> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        id: user.id,
        status: DefaultStatus.ACTIVE,
      },
    });
    if (!foundUser) {
      throw new BadRequestException('email or password is incorrect');
    }
    const userWithToken = new GqlUserWithToken();
    userWithToken.id = foundUser.id;
    userWithToken.token = this.authService.createJwt(foundUser).token;
    userWithToken.fullName = foundUser.fullName;
    return userWithToken;
  }
}
