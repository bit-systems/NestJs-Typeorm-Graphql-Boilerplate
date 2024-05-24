import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AllowUnauthorizedRequest,
  CurrentUser,
} from '@src/libs/core/decorators';
import { UserEntity } from '@src/libs/db/entities';

import { CreateUserInput, LoginUserInput } from './dto/user.inputs';
import { GqlUser, GqlUserWithToken } from './dto/user.outputs';
import { UserService } from './user.service';

@Resolver(() => GqlUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @AllowUnauthorizedRequest()
  @Mutation(() => GqlUserWithToken, { name: 'login' })
  login(
    @Args('loginUserInput')
    loginUserInput: LoginUserInput,
  ) {
    return this.userService.login(loginUserInput);
  }

  @AllowUnauthorizedRequest()
  @Mutation(() => GqlUserWithToken)
  createUser(
    @Args('createUserInput')
    createUserInput: CreateUserInput,
  ) {
    return this.userService.createUser(createUserInput);
  }
  @Query(() => GqlUserWithToken, { name: 'profile' })
  async profile(@CurrentUser() user: UserEntity): Promise<GqlUserWithToken> {
    return this.userService.profile(user);
  }
}
