# LOOP - AI Customer Feedback Intelligence Platform

LOOP is a production-style internship project built with Next.js 14, TypeScript,
Tailwind CSS, Prisma, PostgreSQL, Auth.js/NextAuth, Zod, Recharts, and Claude-ready
AI service helpers.

Tagline: **Close the loop on customer feedback.**

## What Is Included

- Premium responsive SaaS landing page
- Dashboard with stats, sentiment, volume, and theme charts
- Feedback inbox with search/filter UI
- Trends page with growing, stable, and declining themes
- Ask LOOP AI workspace with evidence cards
- Voice of Customer reports page
- Auth UI for login and signup
- Auth.js credentials backend scaffold
- Prisma PostgreSQL schema with tenant isolation fields
- RBAC helper for ADMIN, ANALYST, and VIEWER
- Zod validation for feedback ingestion and AI classification
- Claude API wrapper with local fallback when no API key is set
- CSV ingestion API route
- Report generation API scaffold
- Seed script with one workspace, three users, themes, report, and 120 feedback items

## Recommended Tool Versions

- Node.js: 24 LTS
- npm: 10 or newer
- Git: 2.52 or newer
- PostgreSQL: 18.x

## Setup

```bash
cd loop
npm install
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/loop"
AUTH_SECRET="replace-with-a-long-random-secret"
AUTH_URL="http://localhost:3000"
ANTHROPIC_API_KEY=""
```

Generate Prisma Client:

```bash
npm run db:generate
```

When PostgreSQL is ready:

```bash
npm run db:push
npm run db:seed
```

Start the app:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Demo Users

All seeded users use the password:

```txt
password123
```

- `admin@loop.demo` - ADMIN
- `analyst@loop.demo` - ANALYST
- `viewer@loop.demo` - VIEWER

## Important Architecture Notes

Every tenant-owned database table has `workspaceId`.

Server routes never trust a client-provided workspace ID. They derive the
workspace from the authenticated session through `requireWorkspace()`.

RBAC is enforced on the server:

- ADMIN can manage workspace, users, feedback, themes, analytics, AI, and reports.
- ANALYST can manage feedback, themes, analytics, AI, and reports.
- VIEWER can read feedback, analytics, reports, and use Ask LOOP.

## Main Folders

```txt
src/app
  Landing, app routes, auth routes, and API routes
src/components
  Reusable UI, layout, dashboard, charts, feedback, AI components
src/lib
  Database, auth, permissions, validation, AI, and business logic
prisma
  PostgreSQL schema and professional seed script
src/types
  Shared TypeScript types and NextAuth augmentation
```

## Beginner Roadmap

1. Run the UI demo.
2. Read `src/app/page.tsx` to understand the landing page.
3. Read `src/app/(app)/dashboard/page.tsx` to understand server components.
4. Read `src/lib/permissions.ts` to understand RBAC.
5. Read `prisma/schema.prisma` to understand the database.
6. Connect PostgreSQL and run the seed script.
7. Add real form submissions to login/signup screens.
8. Replace local AI fallback with your Claude key.

## Notes

The visual pages use demo data so the app can be opened immediately. The API and
service files are structured for real PostgreSQL-backed behavior once you add
environment variables and initialize the database.

## Author

**Divya Santosh Lawand**
MCA Student
Internship Project (2026)

## License

This project was developed for educational and internship purposes.