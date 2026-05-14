# Hospital Clock-In Management System

Monorepo:
- `apps/server` (NestJS API + Socket.IO + BullMQ worker)
- `apps/web` (Next.js 15)
- `packages/shared` (shared types/validators)

## Quick start (after npm install)
- `docker compose up -d`
- `npm run dev -w apps/server`
- `npm run dev -w apps/web`

