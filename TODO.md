# TODO - Hospital Clock-In Management System

## Step 1 — Analyze & Plan
- [x] Confirm repo is initialized
- [x] Gather repo/file context
- [x] Create initial implementation plan
- [x] Get plan approval

## Step 2 — Project Bootstrapping
- [ ] Create initial monorepo scaffolding (apps/server, apps/web, packages/shared)
- [ ] Add baseline Docker compose + Dockerfiles
- [ ] Add env templates (.env.example)
- [ ] Ensure root workspaces + scripts are consistent

## Step 3 — Database & Prisma
- [ ] Create Prisma schema (Hospital, Users/Roles/Permissions, etc.)
- [ ] Create prisma config + seed scripts
- [ ] Add migrations instructions

## Step 4 — Auth (first module)
- [ ] JWT access + refresh token strategy
- [ ] RBAC guards + permission middleware
- [ ] Activity logs / audit fields

## Step 5 — Core Admin Modules (order)
- [ ] Users/Roles/Permissions
- [ ] Hospitals/Branches/Settings
- [ ] Employees
- [ ] Devices (sync + stubs)

## Step 6 — Attendance Engine
- [ ] Shift logic (grace, overtime, late/early)
- [ ] Attendance raw log ingestion
- [ ] Attendance processing daily summary
- [ ] Live/realtime dashboard socket events

## Step 7 — Reports / Leave / Payroll
- [ ] Reports queries + export endpoints
- [ ] Leave requests + approval workflow + balances
- [ ] Payroll engine (overtime + leave deductions)

## Step 8 — Notifications
- [ ] BullMQ queues + provider stubs
- [ ] Reminder scheduler

## Step 9 — Production Ops
- [ ] Dockerize remaining services
- [ ] Swagger docs + validation + error formatter
- [ ] Testing setup (unit/e2e)
- [ ] Deployment guide + CI/CD-ready configs

