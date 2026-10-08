# TaskFlow AI

TaskFlow AI is a full-stack software planning workspace. A signed-in user describes a product idea and receives a domain-aware engineering blueprint covering architecture, API design, PostgreSQL schema, auth strategy, roadmap, sprints, tasks, future scope, and a README.

## What is now real

- PostgreSQL persistence through Prisma migrations (no localStorage for product data).
- Account registration, login, logout, refresh sessions, bcrypt password hashing, HttpOnly cookies, and workspace ownership.
- Password visibility toggle on login and registration.
- Protected REST API for generation, listing, search, stats, detail, deletion, and JSON/README/SQL exports.
- Server-side Gemini integration; the API key never ships to the browser.
- Domain detection and a domain-aware fallback for healthcare, logistics, finance, education, community, and commerce ideas.
- Idea-derived architecture boundaries, tables, routes, integrations, metrics, roadmap, and tasks instead of a renamed generic template.
- Generation trace with extracted requirements, domain knowledge notes, and consistency warnings.
- Responsive React dashboard with auth guard, account sign-out, PostgreSQL status, library search, and persisted detail pages.

## Stack

- Frontend: React, TypeScript, Vite, React Router, Tailwind CSS, Framer Motion
- API: Node.js, Express, Zod, Helmet, CORS
- Database: PostgreSQL 16 + Prisma 6
- Auth: bcryptjs + short-lived JWT access cookie + rotated hashed refresh sessions
- AI: server-side Google Gemini structured JSON, with deterministic domain-aware fallback

## Run locally

1. Start PostgreSQL with Docker:

```bash
docker compose up -d postgres
```

2. Create a local environment file using the values below. Keep secrets out of git:

```env
DATABASE_URL=postgresql://taskflow:taskflow@localhost:5432/taskflow_ai?schema=public
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
JWT_ACCESS_SECRET=replace-with-a-long-access-secret-at-least-32-characters
JWT_REFRESH_SECRET=replace-with-a-long-refresh-secret-at-least-32-characters
VITE_API_BASE_URL=http://localhost:4000
GEMINI_API_KEY=
```

3. Install, migrate, and run both processes:

```bash
npm install
npm run db:deploy
npm run dev:full
```

Open `http://localhost:5173`. The API health endpoint is `http://localhost:4000/api/health`.

If `GEMINI_API_KEY` is empty, generation still works using the domain-aware fallback. Add a server-side key to enable live structured generation.

## Vercel deployment

This repository includes `vercel.json` and `api/index.ts`. Vercel serves the Vite build from `dist` and routes `/api/*` to the Express app as a serverless function. The frontend uses same-origin API calls when `VITE_API_BASE_URL` is empty.

1. Push the repository to GitHub and import it into Vercel.
2. Add a managed PostgreSQL database. Neon is a convenient Vercel-friendly option; Supabase, Railway, and Render also work.
3. Add the production environment variables below in Vercel.
4. Run `DATABASE_URL="your-production-url" npx prisma migrate deploy` before the first production use.

Required production variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Managed PostgreSQL runtime connection string |
| `JWT_ACCESS_SECRET` | At least 32 random characters |
| `JWT_REFRESH_SECRET` | A different 32+ character random secret |
| `CLIENT_ORIGIN` | Deployed Vercel URL, such as `https://taskflow-ai.vercel.app` |
| `NODE_ENV` | `production` |
| `GEMINI_API_KEY` | Optional but recommended; enables live Gemini generation |
| `GEMINI_MODEL` | Optional; defaults to `gemini-3.8-flash` and can be changed when Google retires or introduces models |
| `VITE_API_BASE_URL` | Leave empty for same-origin Vercel deployment |

No payment, storage, maps, email, or OAuth keys are currently required. Those are only needed if those features are added later.

## Production workflow

```bash
npm ci
npm run db:deploy
npm run build
npm run dev:api
```

Set `NODE_ENV=production`, long random JWT secrets, a managed PostgreSQL `DATABASE_URL`, and the deployed frontend origin. Use HTTPS so secure cookies are enabled.

## API surface

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | No | API and PostgreSQL health |
| POST | `/api/auth/register` | No | Create user + workspace |
| POST | `/api/auth/login` | No | Start a session |
| POST | `/api/auth/refresh` | Refresh cookie | Rotate access session |
| GET | `/api/auth/me` | Yes | Current user and workspace |
| POST | `/api/auth/logout` | Cookie | Revoke refresh session |
| POST | `/api/blueprints/generate` | Yes | Generate and persist a blueprint |
| GET | `/api/blueprints` | Yes | List/search workspace blueprints |
| GET | `/api/blueprints/stats` | Yes | Workspace metrics |
| GET | `/api/blueprints/:id` | Yes | Read one workspace blueprint |
| DELETE | `/api/blueprints/:id` | Yes | Delete one blueprint |
| GET | `/api/blueprints/:id/export/:format` | Yes | Export `json`, `readme`, or `sql` |

## Quality checks

```bash
npm run build
npm run lint
npm test
```

The source package intentionally excludes `node_modules`, `dist`, local environment files, and database volumes.
