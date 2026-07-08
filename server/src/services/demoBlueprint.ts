import type { ProjectBlueprint } from "../../../src/types/blueprint.types.ts";

function toTitleCase(idea: string): string {
  const words = idea
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 4);

  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ") || "Untitled Project";
}

export function createDemoBlueprint(idea: string): ProjectBlueprint {
  const projectName = toTitleCase(idea);

  return {
    projectName,
    summary: `${projectName} is a production-minded full-stack product concept generated from: "${idea}". This demo blueprint uses deterministic planning logic; connect Gemini for idea-specific AI output.`,
    techStack: [
      { category: "Frontend", choice: "React, TypeScript, Vite", reason: "Fast iteration with strong static contracts and a small operational surface." },
      { category: "UI System", choice: "Tailwind CSS, Framer Motion, Lucide", reason: "Composable styling, tasteful motion, and consistent iconography for a polished SaaS experience." },
      { category: "Backend", choice: "Node.js, Express, TypeScript", reason: "A pragmatic API layer with mature middleware and predictable deployment options." },
      { category: "Database", choice: "PostgreSQL", reason: "Reliable relational modeling for users, projects, generated artifacts, and audit events." },
      { category: "ORM", choice: "Prisma", reason: "Type-safe migrations and data access while keeping schema evolution explicit." },
      { category: "AI", choice: "Google Gemini", reason: "Structured generation support for reliable JSON blueprints." },
      { category: "Deployment", choice: "Vercel plus Railway or Render", reason: "Simple split deployment with managed environment variables and database connectivity." },
    ],
    folderStructure: [
      "taskflow-ai/",
      "  src/",
      "    components/",
      "    pages/",
      "    layouts/",
      "    hooks/",
      "    services/",
      "    types/",
      "    utils/",
      "  server/",
      "    src/",
      "      config/",
      "      controllers/",
      "      middleware/",
      "      routes/",
      "      services/",
      "      utils/",
      "  prisma/",
      "    schema.prisma",
    ].join("\n"),
    architecture: [
      { name: "Presentation Layer", description: "React routes, dashboard surfaces, and blueprint viewers responsible for interaction and rendering.", components: ["DashboardLayout", "IdeaInput", "BlueprintTabs", "Export controls"] },
      { name: "Application API", description: "Express controllers validate requests, enforce boundaries, and return stable JSON contracts.", components: ["BlueprintController", "Health routes", "Error middleware", "Request validators"] },
      { name: "AI Planning Service", description: "Prompt construction, Gemini structured output, response parsing, and fallback generation.", components: ["Gemini client", "Blueprint schema", "Demo generator", "Prompt templates"] },
      { name: "Persistence Layer", description: "PostgreSQL stores generated plans, user ownership, and future collaboration records.", components: ["Prisma models", "Migrations", "Repository functions", "Audit trail"] },
      { name: "Operations", description: "Runtime configuration, CORS, security headers, logging, and deployment separation.", components: ["dotenv", "Helmet", "Environment validation", "Deployment docs"] },
    ],
    apiDesign: [
      { method: "GET", path: "/api/health", description: "Return service status and runtime metadata.", responseBody: "{ status, timestamp }", authRequired: false },
      { method: "POST", path: "/api/blueprints/generate", description: "Generate a software planning blueprint from a natural-language idea.", requestBody: "{ idea: string }", responseBody: "{ blueprint }", authRequired: false },
      { method: "GET", path: "/api/blueprints", description: "List saved blueprints for the authenticated workspace.", responseBody: "{ blueprints: [] }", authRequired: true },
      { method: "GET", path: "/api/blueprints/:id", description: "Fetch one saved blueprint and its generated sections.", responseBody: "{ blueprint }", authRequired: true },
      { method: "POST", path: "/api/blueprints", description: "Persist a generated blueprint to the user's workspace.", requestBody: "{ idea, blueprint }", responseBody: "{ id, blueprint }", authRequired: true },
      { method: "DELETE", path: "/api/blueprints/:id", description: "Delete a saved blueprint owned by the current user.", responseBody: "{ success: true }", authRequired: true },
      { method: "POST", path: "/api/auth/register", description: "Create an account for future cloud sync.", requestBody: "{ name, email, password }", responseBody: "{ user, accessToken }", authRequired: false },
      { method: "POST", path: "/api/auth/login", description: "Authenticate an existing user.", requestBody: "{ email, password }", responseBody: "{ user, accessToken }", authRequired: false },
      { method: "POST", path: "/api/exports/readme", description: "Render a generated README for download or GitHub publishing.", requestBody: "{ blueprintId }", responseBody: "{ markdown }", authRequired: true },
    ],
    databaseSchema: [
      {
        tableName: "users",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "email", type: "VARCHAR(255)", constraints: "UNIQUE, NOT NULL" },
          { name: "name", type: "VARCHAR(120)", constraints: "NOT NULL" },
          { name: "password_hash", type: "TEXT", constraints: "NOT NULL" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["has many workspaces", "has many blueprints through workspace membership"],
      },
      {
        tableName: "workspaces",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "name", type: "VARCHAR(160)", constraints: "NOT NULL" },
          { name: "owner_id", type: "UUID", constraints: "FOREIGN KEY -> users.id" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["belongs to owner", "has many blueprints"],
      },
      {
        tableName: "blueprints",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "workspace_id", type: "UUID", constraints: "FOREIGN KEY -> workspaces.id" },
          { name: "idea", type: "TEXT", constraints: "NOT NULL" },
          { name: "project_name", type: "VARCHAR(180)", constraints: "NOT NULL" },
          { name: "payload", type: "JSONB", constraints: "NOT NULL" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["belongs to workspace", "has many export events"],
      },
      {
        tableName: "export_events",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "blueprint_id", type: "UUID", constraints: "FOREIGN KEY -> blueprints.id" },
          { name: "format", type: "VARCHAR(40)", constraints: "NOT NULL" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["belongs to blueprint"],
      },
    ],
    authStrategy: {
      method: "JWT access token with refresh token rotation",
      description: "The public demo can generate plans anonymously. Saved cloud workspaces should use short-lived access tokens, hashed refresh tokens, and workspace-scoped authorization.",
      flows: [
        "Anonymous users generate blueprints locally or through the public API without creating an account.",
        "Registered users authenticate with email and password; passwords are hashed before persistence.",
        "The API issues a 15-minute access token and a refresh token stored as an HTTP-only cookie.",
        "Authenticated blueprint routes verify token claims and workspace membership.",
        "Logout revokes the active refresh token and clears the browser cookie.",
      ],
      roles: ["Owner", "Editor", "Viewer"],
    },
    roadmap: [
      { phase: "Foundation", duration: "Week 1", goals: ["Establish frontend shell", "Build Express API", "Define shared blueprint contract"] },
      { phase: "Generation Workflow", duration: "Week 2", goals: ["Implement Gemini service", "Add loading and error states", "Persist local history"] },
      { phase: "Persistence and Accounts", duration: "Week 3-4", goals: ["Add Prisma schema", "Implement authentication", "Sync generated blueprints"] },
      { phase: "Export and Documentation", duration: "Week 5", goals: ["README export", "Architecture docs", "Demo story and interview assets"] },
      { phase: "Launch Hardening", duration: "Week 6", goals: ["Validation", "Monitoring", "Deployment checks", "Accessibility polish"] },
    ],
    sprints: [
      { sprintNumber: 1, title: "Product Shell", duration: "1 week", goal: "Deliver a polished planning dashboard that feels like a real SaaS.", deliverables: ["Landing page", "Dashboard layout", "Blueprint tabs", "Local persistence"] },
      { sprintNumber: 2, title: "AI Generation", duration: "1 week", goal: "Generate structured architecture plans reliably.", deliverables: ["Gemini prompt", "JSON schema", "Fallback generator", "Error handling"] },
      { sprintNumber: 3, title: "Backend Boundary", duration: "1 week", goal: "Move production AI calls behind an API boundary.", deliverables: ["Express app", "Controller/service split", "Environment config", "Health route"] },
      { sprintNumber: 4, title: "Cloud Persistence", duration: "2 weeks", goal: "Support authenticated saved blueprints.", deliverables: ["Prisma schema", "Auth routes", "Workspace model", "Blueprint repository"] },
      { sprintNumber: 5, title: "Portfolio Polish", duration: "1 week", goal: "Prepare the project for interviews and demos.", deliverables: ["README", "Architecture document", "Demo script", "Future roadmap"] },
    ],
    tasks: [
      { id: "TF-101", title: "Create reusable blueprint TypeScript contract", priority: "High", estimate: "2h", phase: "Foundation" },
      { id: "TF-102", title: "Build idea submission workflow with validation", priority: "High", estimate: "3h", phase: "Generation Workflow" },
      { id: "TF-103", title: "Implement Gemini structured generation service", priority: "High", estimate: "5h", phase: "Generation Workflow" },
      { id: "TF-104", title: "Add deterministic demo fallback for offline use", priority: "High", estimate: "3h", phase: "Generation Workflow" },
      { id: "TF-105", title: "Create Express health and blueprint routes", priority: "High", estimate: "4h", phase: "Backend Boundary" },
      { id: "TF-106", title: "Add error middleware and Zod validation", priority: "High", estimate: "3h", phase: "Backend Boundary" },
      { id: "TF-107", title: "Model users, workspaces, blueprints, and exports in Prisma", priority: "Medium", estimate: "4h", phase: "Cloud Persistence" },
      { id: "TF-108", title: "Design blueprint detail tabs for each generated section", priority: "High", estimate: "6h", phase: "Product Shell" },
      { id: "TF-109", title: "Add README copy and download controls", priority: "Medium", estimate: "3h", phase: "Export and Documentation" },
      { id: "TF-110", title: "Write architecture and interview documentation", priority: "Medium", estimate: "4h", phase: "Portfolio Polish" },
    ],
    futureScope: [
      { title: "Authenticated Cloud Sync", description: "Move saved blueprint history from localStorage to account-scoped PostgreSQL records.", impact: "High" },
      { title: "GitHub Issue Export", description: "Convert generated task breakdowns into GitHub issues with labels and milestones.", impact: "High" },
      { title: "Architecture Diagram Rendering", description: "Generate editable Mermaid diagrams for each blueprint.", impact: "Medium" },
      { title: "Team Collaboration", description: "Allow shared workspaces, comments, and review status for generated plans.", impact: "Medium" },
      { title: "Cost and Timeline Estimation", description: "Estimate cloud spend, team size, and delivery timeline by project scope.", impact: "Medium" },
    ],
    readme: `# ${projectName}\n\n## Overview\n${projectName} is a production-oriented software concept generated from this idea:\n\n> ${idea}\n\n## Core Features\n- AI-generated software architecture\n- Tech stack recommendation with tradeoffs\n- Folder structure and database schema\n- REST API design and authentication strategy\n- Roadmap, sprint plan, task breakdown, and future enhancements\n\n## Tech Stack\n- React, TypeScript, Vite\n- Tailwind CSS, Framer Motion, Lucide React\n- Node.js, Express, TypeScript\n- PostgreSQL and Prisma\n- Google Gemini API\n\n## Getting Started\n\n\`\`\`bash\nnpm install\ncp .env.example .env\nnpm run dev:full\n\`\`\`\n\n## Folder Structure\n\n\`\`\`text\ntaskflow-ai/\n  src/\n  server/\n  prisma/\n\`\`\`\n\n## License\nMIT\n`,
  };
}
