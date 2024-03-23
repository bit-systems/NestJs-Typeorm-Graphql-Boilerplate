import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AllowUnauthorizedRequest,
  CurrentUser,
} from '@src/libs/core/decorators';
import { UserEntity } from '@src/libs/db/entities';

import { AdminLoginInput } from './dto/admin-login.input';
import { GqlUser, GqlUserWithToken } from './dto/user.output';
import { UserService } from './user.service';

@Resolver(() => GqlUser)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @AllowUnauthorizedRequest()
  @Mutation(() => GqlUserWithToken, { name: 'login' })
  adminLogin(@Args('adminLogInput') adminLogInput: AdminLoginInput) {
    return this.userService.login(adminLogInput);
  }
  @Query(() => GqlUserWithToken, { name: 'profile' })
  async profile(@CurrentUser() user: UserEntity): Promise<GqlUserWithToken> {
    return this.userService.profile(user);
  }
}
