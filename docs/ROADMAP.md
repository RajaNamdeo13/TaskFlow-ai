# Future Roadmap

## Phase 1 - Hardening

- Add runtime validation for full generated blueprint payloads.
- Add request logging and generation latency metrics.
- Add API rate limiting and abuse protection.
- Add Vitest coverage for services and controllers.

## Phase 2 - Accounts and Persistence

- Implement registration and login.
- Store refresh tokens securely.
- Persist blueprints in PostgreSQL through Prisma.
- Add workspace ownership and role-based authorization.

## Phase 3 - Export Workflows

- Export task breakdowns to GitHub issues.
- Export architecture and schema sections to Markdown.
- Generate Mermaid architecture diagrams.
- Add PDF export for interview-ready planning reports.

## Phase 4 - Collaboration

- Add shared workspaces.
- Add comments and review status per blueprint section.
- Support version history and regenerate-in-place for individual sections.

## Phase 5 - Intelligence Layer

- Add follow-up questions before generation for ambiguous ideas.
- Add cost, timeline, and team-size estimates.
- Compare multiple architecture options.
- Recommend deployment plans based on expected scale.
