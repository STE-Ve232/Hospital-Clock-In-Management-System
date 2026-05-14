import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSIONS, type PermissionKey } from './permissions.constants';
import { REQUIRE_PERMISSIONS_KEY } from './require-permissions.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<PermissionKey[]>(
      REQUIRE_PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as { permissions?: PermissionKey[] } | undefined;

    const userPerms = user?.permissions ?? [];

    const ok = required.every((p) => userPerms.includes(p));
    if (!ok) throw new ForbiddenException('Insufficient permissions');

    return true;
  }

  // Temporary helper until RBAC is backed by DB
  static demoPermissionSet(role: string): PermissionKey[] {
    if (role === 'SUPER_ADMIN') return Object.values(PERMISSIONS);
    return [];
  }
}

