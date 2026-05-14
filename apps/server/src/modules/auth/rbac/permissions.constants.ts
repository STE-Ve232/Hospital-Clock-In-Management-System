export const PERMISSIONS = {
  // SUPER_ADMIN
  MANAGE_ALL: 'manage_all',

  // HR
  HR_READ: 'hr_read',
  HR_WRITE: 'hr_write',

  // EMPLOYEE
  EMPLOYEE_READ_SELF: 'employee_read_self'
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

