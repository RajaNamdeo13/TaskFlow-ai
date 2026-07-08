# TaskFlow AI

TaskFlow AI is an AI software planning agent that turns a natural-language product idea into a complete engineering blueprint: architecture, tech stack, folder structure, database schema, API design, authentication strategy, roadmap, sprint plan, task breakdown, README, and future enhancements.

The project is built as a polished portfolio-grade SaaS application, with a React dashboard, an Express API boundary, Gemini structured generation, and a PostgreSQL-ready Prisma data model.

## Features

- Natural-language software idea intake
- Gemini-powered structured blueprint generation
- Offline demo mode with realistic deterministic output
- Architecture, tech stack, and folder structure views
- REST API endpoint planning with auth flags
- PostgreSQL-style schema planning
- Authentication strategy and role modeling
- Roadmap, sprint plan, and engineering task breakdown
- README preview, copy, and download workflow
- Local blueprint history with dashboard metrics
- Production-oriented API structure with validation and error handling

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Routing | React Router |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| Backend | Node.js, Express, TypeScript |
| AI | Google Gemini API |
| Database Model | PostgreSQL with Prisma |
| Validation | Zod |
| Security Middleware | Helmet, CORS |

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev:full
```

Open the frontend at `http://localhost:5173`. The API runs at `http://localhost:4000`.

TaskFlow AI works without a Gemini key by using demo mode. To enable live AI generation, set `GEMINI_API_KEY` in `.env`. The frontend calls the backend when `VITE_API_BASE_URL` is set.

## Useful Scripts

```bash
npm run dev       # frontend only
npm run dev:api   # Express API only
npm run dev:full  # frontend and API together
npm run build     # frontend production build
npm run build:api # API typecheck
npm run lint      # oxlint
```

## Project Structure

```text
taskflow-ai/
  src/
    components/
      blueprint/
      dashboard/
      landing/
      ui/
    hooks/
    layouts/
    pages/
    services/
    types/
  server/
    src/
      config/
      controllers/
      middleware/
      routes/
      services/
      utils/
  prisma/
    schema.prisma
```

## API

`GET /api/health`

Returns service status.

`POST /api/blueprints/generate`

```json
{
  "idea": "A project management app for freelance designers"
}
```

Returns:

```json
{
  "blueprint": {},
  "source": "gemini"
}
```

When Gemini is not configured or fails, the API returns a complete demo blueprint with `"source": "demo"`.

## Environment

```env
VITE_API_BASE_URL=http://localhost:4000
GEMINI_API_KEY=
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskflow_ai
```

`VITE_GEMINI_API_KEY` is still supported for browser-only experiments, but the preferred architecture keeps the Gemini key on the backend.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [GitHub Project Notes](docs/GITHUB.md)
- [Resume and Interview Guide](docs/INTERVIEW.md)
- [Demo Script](docs/DEMO_SCRIPT.md)
- [Future Roadmap](docs/ROADMAP.md)

## License

MIT
