import { SetMetadata } from '@nestjs/common';

import { UserRole } from '../utils';

export const AllowedRoles = (roles: UserRole[]) =>
  SetMetadata('allowedRoles', roles);
