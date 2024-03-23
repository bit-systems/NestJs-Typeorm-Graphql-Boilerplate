import { SetMetadata } from '@nestjs/common';

import { UserRoles } from '../utils';

export const AllowedRoles = (roles: UserRoles[]) =>
  SetMetadata('allowedRoles', roles);
