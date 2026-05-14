
# Implementation Plan — Hospital Clock-In Management System

## 0) Information Gathered
- Repo folder is currently empty: `list_files` returned no files.
- Therefore: generate the entire monorepo from scratch inside `c:/Users/NEWTON/Hospital Clock-In Management System`.
- Target architecture per request: **NestJS (backend) + Next.js 15 (frontend) + Prisma (PostgreSQL) + Socket.IO + BullMQ/Redis + ZKLib device integration + Docker**.
- Build order will follow the guidance: **Auth → Users/Roles → Hospitals → Employees → Devices → Attendance engine → Shift logic → Reports → Leave → Payroll → Notifications → Analytics**.

## 1) Plan (Codebase / Folder-level)
### Monorepo layout
- `apps/server` (NestJS API + Socket.IO + BullMQ worker entry)
- `apps/web` (Next.js 15 App Router UI)
- `packages/shared` (shared types, validation schemas, DTO helpers)
- `infra` (docker/nginx configs)
- `docs` (deployment/testing docs)

### Backend layers (NestJS)
- `src/modules/<module>/...`
- Controller → Service → Repository (Prisma) where applicable
- Guards/Interceptors for auth, rate limiting, logging, error formatting
- DTOs validated by `class-validator` + `class-transformer`
- Centralized `HttpException` mapping to a consistent API response format

### Frontend layers
- App Router routes: `/login`, `/dashboard/...`, `/employees`, `/attendance`, `/reports`, `/leave`, `/payroll`
- Zustand/RTK (choose one) for global auth state
- React Query for server state
- Axios instance with JWT + refresh handling
- Socket.IO client for live attendance monitoring
- Shadcn UI + TailwindCSS + light/dark theme

## 2) Database Schema Plan (Prisma)
- Core multi-tenant keys: `hospitalId` on tenant-owned tables
- Entities (at minimum):
  - `Hospital`, `Department`, `User`, `Role`, `Permission`
  - `Employee`, `Shift`, `EmployeeShift`
  - `Device`, `AttendanceLog`, `AttendanceSummary`
  - `LeaveType`, `LeaveRequest`
  - `PayrollRecord`, `PayrollComponent`, `Deduction`
  - `Holiday`, `Notification`, `ActivityLog`, `Setting`
- Requirements:
  - proper relations, FKs
  - indexes on commonly filtered fields: `(hospitalId, employeeId, date)` etc.
  - timestamps and soft deletes (where requested)
  - audit fields (createdBy/updatedBy + activity logs)

## 3) Build Order (per deliverables)
1. **Folder structure + Docker baseline + env templates**
2. **Database + Prisma + seed**
3. **Backend Auth** (login/logout/refresh/forgot-password stub, RBAC guards, activity logs)
4. **Users/Roles/Permissions module**
5. **Hospital management module**
6. **Department management module**
7. **Employee management module**
8. **Device management module** (sync + TCP/UDP integration stubs)
9. **Attendance engine module** (raw ingestion + processing nightly)
10. **Shift logic module** (grace, overtime, late/early rules)
11. **Reports module** (daily/monthly/overtime)
12. **Leave module**
13. **Payroll module**
14. **Notifications module** (BullMQ queues + providers stubs)
15. **Realtime module** (Socket.IO events and online/offline device tracking)
16. **Frontend module-by-module pages**
17. **Swagger docs + testing + deployment guide**

## 4) Dependent Files to be edited
This is a fresh repo: files will be newly created.

## 5) Followup steps (after code generation)
- Run `docker compose up -d` (postgres + redis)
- Run `prisma migrate dev` + `prisma db seed`
- Run backend dev server
- Run frontend dev server
- Run background worker for BullMQ
- Validate endpoints via Swagger

<ask_followup_question>
Review and approve this generation approach (full monorepo from scratch with the above build order and architecture). After approval I will start Step 2: creating the folder structure + initial backend/frontend skeleton + Docker baseline.
</ask_followup_question>

