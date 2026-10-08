<div align="center">

✦ TaskFlow AI

Turn a product idea into an implementation-ready engineering blueprint.

<p>
<strong>Domain-aware planning · PostgreSQL persistence · Secure authentication · Gemini-powered generation</strong>
</p> <p>
  <a href="https://github.com/RajaNamdeo13/TaskFlow-ai"><img src="https://img.shields.io/badge/GitHub-TaskFlow%20AI-181717?style=for-the-badge&logo=github" alt="GitHub repository"></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL 16">
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma 6">
  <img src="https://img.shields.io/badge/Gemini-Server--side_AI-4285F4?style=for-the-badge&logo=google" alt="Google Gemini">
</p> <p>
  <a href="#-quick-start">Quick start</a> ·
  <a href="#-product-overview">Product</a> ·
  <a href="#-architecture">Architecture</a> ·
  <a href="#-deployment">Deployment</a> ·
  <a href="#-api-surface">API</a>
</p> </div>


TaskFlow AI is a full-stack AI planning workspace for founders, developers, consultants, and product teams. Describe a software idea in natural language and receive a domain-specific blueprint covering architecture, data models, APIs, authentication, delivery planning, engineering tasks, metrics, risks, and future scope.

<div align="center">

🚀 Product
🧠 Intelligence
🗄️ Persistence
🔐 Security
React dashboard
Gemini + domain fallback
PostgreSQL + Prisma
JWT + HttpOnly cookies




</div>

📸 Product preview

<p align="center">
<img src="assets/screenshots/landing.png" alt="TaskFlow AI landing page" width="48%">
  <img src="assets/screenshots/dashboard.png" alt="TaskFlow AI dashboard" width="48%">
</p>
<p align="center">
  <img src="assets/screenshots/generator.png" alt="TaskFlow AI blueprint generator" width="48%">
  <img src="assets/screenshots/features.png" alt="TaskFlow AI features" width="48%">
</p>

🎯 Product overview

TaskFlow AI helps transform an early product idea into a structured engineering handoff.

The workflow

Plain Text


Natural-language idea
        ↓
Requirement extraction + domain detection
        ↓
Gemini structured generation or domain-aware fallback
        ↓
Consistency validation + generation trace
        ↓
PostgreSQL workspace persistence
        ↓
Architecture, API, schema, roadmap, tasks, and exports



What a blueprint contains

•
🧭 Architecture — product-specific system boundaries and responsibilities

•
🧱 Tech stack — practical choices with reasons and trade-offs

•
🗂️ Folder structure — an implementation-oriented project layout

•
🔌 API design — routes, methods, request/response contracts, and auth requirements

•
🗄️ Database schema — domain entities, fields, constraints, and relationships

•
🛡️ Authentication strategy — session flow, roles, and security boundaries

•
🗺️ Roadmap — phases, goals, duration, and launch hardening

•
🏃 Sprint plan — delivery slices with concrete deliverables

•
✅ Engineering tasks — prioritized implementation work with estimates

•
📖 README export — a handoff-ready project document

•
🔍 Generation trace — detected domain, extracted requirements, knowledge notes, and validation status

✨ Core capabilities

•
Domain-specific generation: healthcare, logistics, finance, education, community, commerce, and other product categories receive different architectural decisions.

•
Live Gemini integration: structured server-side generation through Google Gemini; the API key never enters the browser bundle.

•
Resilient fallback: the application remains useful when Gemini is unavailable by using deterministic domain-aware generation.

•
Persistent workspaces: users, workspaces, blueprints, refresh sessions, and export events are stored in PostgreSQL.

•
Secure authentication: bcrypt password hashing, short-lived access cookies, rotated hashed refresh sessions, protected routes, and logout revocation.

•
Blueprint library: search, statistics, detail views, deletion, and export formats for saved records.

•
Explainable output: each generated blueprint shows why its domain, entities, workflows, integrations, and metrics were selected.

•
Abuse protection: authentication and generation endpoints include lightweight rate limiting.

•
Deployment-ready: Vercel serverless API entrypoint, SPA rewrites, Prisma migrations, Docker PostgreSQL, and production environment documentation.

🧠 Why results are not generic

TaskFlow does not simply rename one static template. It extracts product signals and adapts the blueprint around them.

Product idea
Example domain decisions
Clinic monitoring platform
consent boundaries, patient records, wearable events, care-team escalation
Delivery dispatch console
route state, scan events, driver sync, proof of delivery, exceptions
Invoice reconciliation system
transactions, matching rules, approval cases, idempotency, audit events
Learning platform
learners, lessons, attempts, mastery progression, coach interventions




The generated architecture, database nouns, API routes, integrations, metrics, roadmap, and task titles are derived from the detected domain and the original idea.

🏗️ Architecture

Plain Text


┌──────────────────────────────────────────────────────────────┐
│ React + TypeScript + Vite                                   │
│ Landing · Auth · Dashboard · Generator · Blueprint Viewer   │
└─────────────────────────────┬────────────────────────────────┘
                              │ REST / JSON + HttpOnly cookies
┌─────────────────────────────▼────────────────────────────────┐
│ Express API                                                  │
│ Helmet · CORS · Zod validation · rate limiting · errors     │
└───────────────┬──────────────────────────────┬───────────────┘
                │                              │
┌───────────────▼──────────────┐  ┌────────────▼───────────────┐
│ Generation services           │  │ Authentication services     │
│ Gemini · domain knowledge     │  │ JWT access · refresh       │
│ fallback · validation        │  │ bcrypt · cookie sessions   │
└───────────────┬──────────────┘  └────────────┬───────────────┘
                │                              │
                └──────────────┬───────────────┘
                               ▼
                 ┌─────────────────────────────┐
                 │ PostgreSQL + Prisma          │
                 │ Users · workspaces          │
                 │ blueprints · audit events   │
                 └─────────────────────────────┘



Repository structure

Plain Text


TaskFlow-ai/
├── api/                         # Vercel serverless entrypoint
├── prisma/                      # PostgreSQL schema and migrations
├── server/src/
│   ├── config/                  # Environment validation
│   ├── db/                      # Prisma client
│   ├── middleware/              # Auth, errors, rate limiting
│   ├── routes/                  # Auth, blueprint, health endpoints
│   ├── services/                # AI, domain knowledge, validation, exports
│   └── index.ts                 # Local API entrypoint
├── src/
│   ├── components/              # Dashboard, blueprint, landing, UI components
│   ├── context/                 # Auth context
│   ├── layouts/                 # Dashboard layout
│   ├── pages/                   # Application routes
│   ├── services/                # Typed browser API client
│   └── types/                   # Shared blueprint contracts
├── scripts/                     # Source packaging helpers
├── docker-compose.yml           # Local PostgreSQL
├── vercel.json                  # Vercel build and rewrites
└── README.md



🧰 Tech stack

Layer
Technology
Responsibility
Frontend
React, TypeScript, Vite
Product interface and typed client experience
Styling
Tailwind CSS, Framer Motion, Lucide
Visual system, responsive layout, interaction polish
API
Node.js, Express, Zod
REST boundary, validation, middleware, errors
Database
PostgreSQL 16
Durable relational application data
ORM
Prisma 6
Schema management, migrations, and typed queries
Authentication
bcryptjs, JWT, HttpOnly cookies
Password security and session lifecycle
AI
Google Gemini
Structured blueprint generation
Testing
Vitest, Oxlint
Unit checks, integration credential check, static quality
Deployment
Vercel + managed PostgreSQL
Serverless hosting and production persistence




🚀 Quick start

Prerequisites

•
Node.js 20+

•
Docker Desktop

•
Git

•
A Google Gemini API key is optional for local startup; the domain-aware fallback works without it.

1. Clone and enter the project

Bash


git clone https://github.com/RajaNamdeo13/TaskFlow-ai.git
cd TaskFlow-ai
npm install



2. Start PostgreSQL

Bash


docker compose up -d postgres
docker compose ps



The default Compose mapping is 5432:5432. If port 5432 is already occupied on Windows, use a host mapping such as 55432:5432 and update the DATABASE_URL port to 55432.

3. Create .env

Copy .env.example to .env and set local values:

Plain Text


NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://taskflow:taskflow@127.0.0.1:5432/taskflow_ai?schema=public
CLIENT_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
JWT_ACCESS_SECRET=generate-a-random-secret-at-least-32-characters
JWT_REFRESH_SECRET=generate-a-different-random-secret-at-least-32-characters
VITE_API_BASE_URL=http://localhost:4000
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.8-flash



Generate strong secrets with:

Bash


node -e "console.log(require('crypto' ).randomBytes(32).toString('hex'))"



Never commit .env.

4. Create the database schema

Bash


npx prisma generate
npx prisma migrate deploy



5. Start the full application

Bash


npm run dev:full



Open:

•
Frontend: http://localhost:5173

•
API health: http://localhost:4000/api/health

A healthy response contains:

JSON


{
  "status": "ok",
  "database": "connected"
}



🧪 Testing and quality

Run the standard quality gate:

Bash


npm test
npm run build
npm run lint



The normal test suite is deterministic and does not require an external Gemini credential. To run the optional live Gemini credential check, provide the key explicitly in your shell and run the dedicated test command configured in the project.

Before opening a pull request, verify:

•
PostgreSQL health reports connected.

•
Registration and login work.

•
Password visibility works.

•
A generated blueprint survives a browser refresh.

•
Different domains produce different entities, routes, and architecture.

•
.env is ignored and no secret appears in staged files.

🔌 API surface

Method
Route
Auth
Purpose
GET
/api/health
—
API and PostgreSQL health
POST
/api/auth/register
—
Create a user and workspace
POST
/api/auth/login
—
Start a session
POST
/api/auth/refresh
Cookie
Rotate the refresh session
GET
/api/auth/me
✓
Read the current user and workspace
POST
/api/auth/logout
Cookie
Revoke the refresh session
POST
/api/blueprints/generate
✓
Generate and persist a blueprint
GET
/api/blueprints
✓
Search saved workspace blueprints
GET
/api/blueprints/stats
✓
Read workspace metrics
GET
/api/blueprints/:id
✓
Read one blueprint
DELETE
/api/blueprints/:id
✓
Delete one blueprint
GET
/api/blueprints/:id/export/:format
✓
Export JSON, README, or SQL




☁️ Deployment

Vercel + managed PostgreSQL

The repository includes:

•
vercel.json for Vite output and SPA rewrites

•
api/index.ts for the Express serverless function

•
Prisma migrations for production schema deployment

•
Same-origin /api support when VITE_API_BASE_URL is empty

Recommended providers include Neon, Supabase, Railway, and Render.

1.
Push the repository to GitHub.

2.
Create a managed PostgreSQL database.

3.
Run the production migration:

Bash


DATABASE_URL="your-production-url" npx prisma migrate deploy



1.
Import the repository into Vercel.

2.
Add the following variables in Vercel:

Variable
Production value
DATABASE_URL
Managed PostgreSQL connection string
JWT_ACCESS_SECRET
Random secret, 32+ characters
JWT_REFRESH_SECRET
Different random secret, 32+ characters
CLIENT_ORIGIN
Your exact HTTPS Vercel URL
NODE_ENV
production
GEMINI_API_KEY
Server-only Google Gemini key
GEMINI_MODEL
gemini-3.8-flash or an available model
VITE_API_BASE_URL
Empty for same-origin deployment




1.
Deploy and verify:

Plain Text


https://your-project.vercel.app/api/health



Never expose GEMINI_API_KEY through a VITE_ variable.

🔐 Security notes

•
.env is local-only and must never be committed.

•
Gemini credentials are read server-side and are not included in the browser bundle.

•
Passwords are hashed with bcrypt before persistence.

•
Refresh tokens are hashed in the database and rotated during refresh.

•
Access and refresh secrets must be different in production.

•
Use HTTPS in production so secure cookies work correctly.

•
Rate limiting protects authentication and generation routes from basic abuse.

•
Rotate any credential that has been exposed in chat, logs, screenshots, or Git history.

🗺️ Roadmap

Completed




Full-stack React + Express application




PostgreSQL persistence with Prisma




Authenticated workspaces and refresh sessions




Gemini structured generation with resilient fallback




Domain-aware blueprint personalization




Blueprint search, statistics, detail, and exports




Generation trace and consistency validation




Rate limiting and Vercel deployment support

Future extensions




Workspace invitations and role-based collaboration




Email verification and password reset




Blueprint version history and comments




GitHub Issues, Jira, and Notion exports




Mermaid architecture diagrams




PDF export and shareable public links




Usage quotas, billing, and admin analytics

💼 Resume-ready project summary


Built a production-oriented full-stack AI planning workspace using React, TypeScript, Express, PostgreSQL, Prisma, JWT authentication, and Google Gemini. Implemented domain-aware structured generation, resilient offline fallback logic, persistent user workspaces, secure refresh sessions, API rate limiting, blueprint exports, consistency validation, and Vercel deployment support.

📄 License

MIT

