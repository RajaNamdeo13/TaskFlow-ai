# 7-10 Minute Demo Script

## 0:00-1:00 - Positioning

TaskFlow AI is an AI software planning agent. The goal is to help a developer turn a rough product idea into an implementation-ready blueprint: architecture, API design, database schema, auth strategy, roadmap, sprint plan, tasks, README, and future scope.

## 1:00-2:00 - Product Tour

Open the landing page and dashboard. Point out that this is designed like a real SaaS product: dark interface, persistent sidebar, dashboard metrics, saved blueprints, and a focused generation workflow.

## 2:00-3:30 - Generate a Blueprint

Go to "Generate Blueprint" and enter a realistic idea, for example:

```text
A CRM for boutique design agencies to manage leads, proposals, project handoff, and client communication.
```

Submit the form. Explain that the frontend calls the Express API when configured, and the API asks Gemini for structured JSON. If Gemini is unavailable, demo mode still returns a complete blueprint.

## 3:30-5:30 - Walk Through Generated Sections

Open the generated blueprint and move through:

- Architecture: layers, components, tech stack, folder structure.
- API Design: realistic endpoints with auth requirements.
- Database: tables, fields, constraints, and relations.
- Auth: token strategy, roles, and flows.
- Roadmap and Sprints: delivery plan.
- Tasks: granular implementation work.
- README: generated documentation with preview, copy, and download.

## 5:30-7:00 - Engineering Architecture

Show the repository structure:

- `src` for React UI.
- `server/src` for Express routes, controllers, services, middleware, and config.
- `prisma/schema.prisma` for the PostgreSQL-ready data model.
- `docs` for architecture and interview collateral.

Emphasize the API boundary, typed blueprint contract, validation, centralized errors, and fallback design.

## 7:00-8:30 - Production Readiness

Discuss what is already handled:

- Environment configuration.
- Gemini key kept server-side for the preferred path.
- CORS and Helmet.
- Local history for frictionless demos.
- Prisma schema for cloud persistence.

## 8:30-10:00 - Roadmap and Close

Close with next steps: authenticated workspaces, cloud sync, GitHub issue export, Mermaid diagrams, and observability. The key takeaway is that this is not only an AI wrapper; it is a structured planning product with a credible path to production.
