import { GqlUser } from '@src/modules/admin/user/dto/user.output';

import { UserEntity } from '../db/entities';

export const transformToUserGQLType = (user: UserEntity): GqlUser => ({
  id: user.id,
  fullName: user.fullName,
});

export const transformToUserWithGQLType = (user: UserEntity): GqlUser => ({
  id: user.id,
  fullName: user.fullName,
});
