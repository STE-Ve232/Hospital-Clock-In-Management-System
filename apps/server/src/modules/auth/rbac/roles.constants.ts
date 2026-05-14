export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
  HR_MANAGER: 'HR_MANAGER',
  SUPERVISOR: 'SUPERVISOR',
  EMPLOYEE: 'EMPLOYEE'
} as const;

export type RoleKey = (typeof ROLES)[keyof typeof ROLES];

