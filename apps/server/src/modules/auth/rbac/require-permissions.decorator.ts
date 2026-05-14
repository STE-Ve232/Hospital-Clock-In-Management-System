import { SetMetadata } from '@nestjs/common';

import type { PermissionKey } from './permissions.constants';

export const REQUIRE_PERMISSIONS_KEY = 'require_permissions';

export const RequirePermissions = (...permissions: PermissionKey[]) =>
  SetMetadata(REQUIRE_PERMISSIONS_KEY, permissions);

