# Architecture

TaskFlow AI uses a full-stack architecture with a clear frontend/API boundary. The frontend is responsible for product experience, local history, and rendering generated plans. The backend owns AI orchestration, validation, security middleware, and future database persistence.

## System Overview

```text
Browser
  -> React dashboard
  -> Blueprint generation service
  -> Express API
  -> Gemini structured generation
  -> PostgreSQL via Prisma (planned persistence path)
```

## Frontend

The React application is organized by product surface:

- `pages` define route-level screens.
- `layouts` define shared shells such as the dashboard.
- `components/blueprint` renders each generated blueprint section.
- `components/dashboard` owns the creation and history experience.
- `services` isolates API, Gemini fallback, and local persistence.
- `types` holds the shared blueprint contract.

The frontend prefers the Express API through `VITE_API_BASE_URL`. If the API is not configured or unavailable, it falls back to the browser Gemini client and then demo mode. This keeps the project reliable during interviews while still demonstrating production intent.

## Backend

The API follows a route-controller-service split:

- `routes` register endpoint groups.
- `controllers` validate request payloads and shape HTTP responses.
- `services` contain Gemini orchestration and fallback generation.
- `middleware` handles 404s and centralized error responses.
- `config` validates environment variables at startup.

`POST /api/blueprints/generate` accepts a software idea and returns a typed `ProjectBlueprint`. Gemini is configured for JSON output with a response schema to reduce parsing risk.

## Data Model

The Prisma schema models the next production step:

- `User` for account identity.
- `Workspace` for ownership and future collaboration.
- `Blueprint` for generated planning artifacts stored as JSON.
- `ExportEvent` for auditability around README and future export actions.

The current UI saves generated plans in `localStorage` so the portfolio demo is immediately usable without provisioning infrastructure.

## Error Handling

Validation errors return `400` with structured details. Unknown routes return `404`. Unexpected failures return `500` with detailed messages in development and sanitized responses in production.

## Security

The backend uses Helmet, CORS allow-listing through `CLIENT_ORIGIN`, JSON body limits, and server-side secret handling for Gemini. The intended auth path is JWT access tokens with refresh token rotation and workspace-scoped authorization.
