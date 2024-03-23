import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { transformToUserWithTokenGQLType } from '@src/libs/converters';
import { AuthService } from '@src/libs/core/auth/auth.service';
import { UserStatus } from '@src/libs/core/utils';
import { UserEntity } from '@src/libs/db/entities';
import * as bcrypt from 'bcrypt';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { CreateUserInput, LoginUserInput } from './dto/user.inputs';
import { GqlUserWithToken } from './dto/user.outputs';

@Injectable()
export class UserService {
  constructor(
    private logger: PinoLogger,

    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async login(inputs: LoginUserInput): Promise<GqlUserWithToken> {
    const user = await this.usersRepository.findOne({
      where: {
        email: inputs.email,
        status: UserStatus.ACTIVE,
      },
    });

    if (!user) {
      throw new BadRequestException('email or password is incorrect');
    }

    const isMatch = bcrypt.compareSync(inputs.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('email or password is incorrect');
    }

    const token = this.authService.createJwt(user).token;
    return transformToUserWithTokenGQLType(user, token);
  }

  async profile(user: UserEntity): Promise<GqlUserWithToken> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        id: user.id,
        status: UserStatus.ACTIVE,
      },
    });
    if (!foundUser) {
      throw new BadRequestException('email or password is incorrect');
    }
    const token = this.authService.createJwt(foundUser).token;
    return transformToUserWithTokenGQLType(foundUser, token);
  }

  async createUser(user: CreateUserInput): Promise<GqlUserWithToken> {
    const foundUser = await this.usersRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (foundUser) {
      throw new BadRequestException('email is already taken');
    }
    user.password = bcrypt.hashSync(user.password, 10);
    const createdUser = await this.usersRepository.save(user);
    const token = this.authService.createJwt(createdUser).token;
    return transformToUserWithTokenGQLType(createdUser, token);
  }
}
