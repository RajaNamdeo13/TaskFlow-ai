# Resume and Interview Guide

## Resume Description

Built TaskFlow AI, a full-stack AI software planning agent that converts natural-language product ideas into production-style engineering blueprints, including system architecture, tech stack recommendations, database schemas, REST API plans, authentication strategy, sprint planning, engineering tasks, README documentation, and future roadmap. Implemented a React/TypeScript SaaS dashboard, Express/TypeScript API boundary, Gemini structured generation, Zod validation, local persistence, and a PostgreSQL-ready Prisma data model.

## Short Interview Pitch

TaskFlow AI is a portfolio SaaS product that helps developers move from idea to implementation plan. The interesting part is that it does not just ask Gemini for prose. It asks for a typed blueprint contract, validates the request at the API boundary, renders each section through purpose-built UI, and keeps a deterministic demo path so the app remains reliable without external services.

## Technical Talking Points

- Used a shared `ProjectBlueprint` TypeScript contract to keep AI output, UI rendering, and storage aligned.
- Kept Gemini credentials on the backend for the production path.
- Added graceful fallback behavior so interviews and demos are not dependent on API availability.
- Split backend code into routes, controllers, services, middleware, config, and utils.
- Modeled future persistence with Prisma around users, workspaces, blueprints, and exports.
- Designed the UI as a dense SaaS dashboard rather than a marketing template.

## Tradeoffs

- The current demo stores history in `localStorage` for zero-infrastructure usability.
- Prisma schema is ready, but account-based cloud sync is intentionally left as roadmap work.
- Gemini output is schema-guided and parsed as JSON; stricter runtime validation of generated blueprint payloads would be the next hardening step.

## Strong Answers

**Why use an API if the frontend can call Gemini directly?**

Server-side AI calls protect secrets, centralize prompt/version control, simplify observability, and allow future persistence, rate limiting, and user-based quotas.

**What makes this production-minded?**

The project has a typed domain contract, API validation, central error handling, environment configuration, security middleware, realistic data modeling, and complete UI states for generation, history, and blueprint inspection.

**What would you build next?**

I would add authenticated cloud sync, runtime validation for generated blueprint payloads, GitHub issue export, and observability around generation latency and fallback rate.
