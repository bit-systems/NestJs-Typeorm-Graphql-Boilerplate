import { GqlUser, GqlUserWithToken } from '@src/modules/user/dto/user.outputs';

import { UserEntity } from '../db/entities';

export const transformToUserGQLType = (user: UserEntity): GqlUser => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  gender: user.gender,
});

export const transformToUserWithTokenGQLType = (
  user: UserEntity,
  token: string,
): GqlUserWithToken => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  gender: user.gender,
  token,
});
