import { GoogleGenAI, Type } from "@google/genai";
import type { ProjectBlueprint } from "../types/blueprint.types";
import { generateBlueprintFromApi, isApiConfigured } from "./blueprintApi";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export function isGeminiConfigured(): boolean {
  return Boolean(API_KEY);
}

const blueprintSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: { type: Type.STRING },
    summary: { type: Type.STRING },
    techStack: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          choice: { type: Type.STRING },
          reason: { type: Type.STRING },
        },
        required: ["category", "choice", "reason"],
      },
    },
    folderStructure: { type: Type.STRING },
    architecture: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          components: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["name", "description", "components"],
      },
    },
    apiDesign: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          method: { type: Type.STRING },
          path: { type: Type.STRING },
          description: { type: Type.STRING },
          requestBody: { type: Type.STRING },
          responseBody: { type: Type.STRING },
          authRequired: { type: Type.BOOLEAN },
        },
        required: ["method", "path", "description", "authRequired"],
      },
    },
    databaseSchema: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          tableName: { type: Type.STRING },
          fields: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING },
                constraints: { type: Type.STRING },
              },
              required: ["name", "type", "constraints"],
            },
          },
          relations: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["tableName", "fields", "relations"],
      },
    },
    authStrategy: {
      type: Type.OBJECT,
      properties: {
        method: { type: Type.STRING },
        description: { type: Type.STRING },
        flows: { type: Type.ARRAY, items: { type: Type.STRING } },
        roles: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["method", "description", "flows", "roles"],
    },
    roadmap: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phase: { type: Type.STRING },
          duration: { type: Type.STRING },
          goals: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["phase", "duration", "goals"],
      },
    },
    sprints: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          sprintNumber: { type: Type.INTEGER },
          title: { type: Type.STRING },
          duration: { type: Type.STRING },
          goal: { type: Type.STRING },
          deliverables: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["sprintNumber", "title", "duration", "goal", "deliverables"],
      },
    },
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          priority: { type: Type.STRING },
          estimate: { type: Type.STRING },
          phase: { type: Type.STRING },
        },
        required: ["id", "title", "priority", "estimate", "phase"],
      },
    },
    futureScope: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          impact: { type: Type.STRING },
        },
        required: ["title", "description", "impact"],
      },
    },
    readme: { type: Type.STRING },
  },
  required: [
    "projectName",
    "summary",
    "techStack",
    "folderStructure",
    "architecture",
    "apiDesign",
    "databaseSchema",
    "authStrategy",
    "roadmap",
    "sprints",
    "tasks",
    "futureScope",
    "readme",
  ],
};

function buildPrompt(idea: string): string {
  return `You are a Senior Software Architect and Staff Engineer. A user gave this software idea:

"${idea}"

Generate a COMPLETE, production-grade software planning blueprint as JSON matching the schema.
Requirements:
- Be specific to THIS idea, not generic.
- techStack: 5-8 realistic technology choices with reasons.
- architecture: 3-5 layers (e.g. Presentation, Business Logic, Data, Infra) with real components.
- apiDesign: 8-14 realistic REST endpoints with request/response shapes.
- databaseSchema: 4-8 tables with realistic fields, types, constraints, and relations.
- authStrategy: a realistic auth method (e.g. JWT + refresh tokens, OAuth2, session-based), a description, 3-6 step-by-step flows, and relevant user roles.
- roadmap: 4-6 phases with durations (e.g. "Week 1-2") and goals.
- sprints: 4-8 two-week sprints with sprint number, title, duration, one clear goal, and 3-5 deliverables each.
- tasks: 15-25 granular engineering tasks tagged with priority, estimate, and phase.
- futureScope: 4-6 realistic future enhancements with title, description, and impact (High/Medium/Low).
- readme: A full markdown README as a single string (use \\n for newlines) including title, overview, features, tech stack, setup instructions, folder structure, and license.
- folderStructure: a realistic folder tree as a single string using \\n and indentation.

Return ONLY valid JSON matching the schema. No prose, no markdown fences.`;
}

export async function generateBlueprint(idea: string): Promise<ProjectBlueprint> {
  if (isApiConfigured()) {
    try {
      return await generateBlueprintFromApi(idea);
    } catch (err) {
      console.warn("TaskFlow API generation failed, trying browser fallback:", err);
    }
  }

  if (!ai) {
    await simulateLatency();
    return generateMockBlueprint(idea);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: buildPrompt(idea),
      config: {
        responseMimeType: "application/json",
        responseSchema: blueprintSchema,
        temperature: 0.6,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    return JSON.parse(text) as ProjectBlueprint;
  } catch (err) {
    console.error("Gemini API call failed, falling back to demo blueprint:", err);
    return generateMockBlueprint(idea);
  }
}

function simulateLatency(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1600));
}

function toTitleCase(idea: string): string {
  const words = idea
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 4);
  return words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") || "Untitled Project";
}

function generateMockBlueprint(idea: string): ProjectBlueprint {
  const projectName = `${toTitleCase(idea)}`;

  return {
    projectName,
    summary: `${projectName} is a full-stack platform built around this idea: "${idea}". This blueprint was generated in demo mode using a deterministic template — connect a Gemini API key to generate blueprints tailored precisely to your idea.`,
    techStack: [
      { category: "Frontend", choice: "React + TypeScript + Vite", reason: "Fast HMR dev loop, strong typing, minimal build config" },
      { category: "Styling", choice: "Tailwind CSS", reason: "Utility-first styling for rapid, consistent UI iteration" },
      { category: "Backend", choice: "Node.js + Express", reason: "Lightweight, unopinionated, huge ecosystem" },
      { category: "Database", choice: "PostgreSQL", reason: "Relational integrity for structured, related domain data" },
      { category: "ORM", choice: "Prisma", reason: "Type-safe queries and painless migrations" },
      { category: "Auth", choice: "JWT + Refresh Tokens", reason: "Stateless sessions that scale horizontally" },
      { category: "Hosting", choice: "Vercel (frontend) + Railway (backend)", reason: "Zero-config deploys, generous free tiers for MVPs" },
    ],
    folderStructure:
      "src/\n├── components/\n│   ├── ui/\n│   └── features/\n├── pages/\n├── layouts/\n├── services/\n├── hooks/\n├── types/\n├── lib/\n└── App.tsx",
    architecture: [
      { name: "Presentation Layer", description: "React components, pages, and hooks responsible for UI and user interaction.", components: ["Pages", "Components", "Hooks", "Context Providers"] },
      { name: "Application Layer", description: "Business logic, orchestration, and validation between UI and data.", components: ["Services", "Controllers", "Validators", "Middleware"] },
      { name: "Data Layer", description: "Persistence, queries, and data access abstractions.", components: ["Prisma Models", "Repositories", "Migrations", "Seeders"] },
      { name: "Infrastructure", description: "Cross-cutting concerns supporting the whole system.", components: ["Auth Provider", "Logger", "CI/CD Pipeline", "Monitoring"] },
    ],
    apiDesign: [
      { method: "POST", path: "/api/auth/register", description: "Register a new user account", requestBody: "{ email, password, name }", responseBody: "{ user, token }", authRequired: false },
      { method: "POST", path: "/api/auth/login", description: "Authenticate an existing user", requestBody: "{ email, password }", responseBody: "{ user, token }", authRequired: false },
      { method: "POST", path: "/api/auth/refresh", description: "Exchange a refresh token for a new access token", requestBody: "{ refreshToken }", responseBody: "{ token }", authRequired: false },
      { method: "GET", path: "/api/users/me", description: "Get the authenticated user's profile", responseBody: "{ user }", authRequired: true },
      { method: "GET", path: "/api/resources", description: "List all resources belonging to the user", responseBody: "{ resources: [] }", authRequired: true },
      { method: "POST", path: "/api/resources", description: "Create a new resource", requestBody: "{ title, description }", responseBody: "{ resource }", authRequired: true },
      { method: "GET", path: "/api/resources/:id", description: "Get a single resource by ID", responseBody: "{ resource }", authRequired: true },
      { method: "PUT", path: "/api/resources/:id", description: "Update an existing resource", requestBody: "{ title?, description? }", responseBody: "{ resource }", authRequired: true },
      { method: "DELETE", path: "/api/resources/:id", description: "Delete a resource", responseBody: "{ success: true }", authRequired: true },
      { method: "GET", path: "/api/notifications", description: "List recent notifications for the user", responseBody: "{ notifications: [] }", authRequired: true },
      { method: "PATCH", path: "/api/notifications/:id/read", description: "Mark a notification as read", responseBody: "{ success: true }", authRequired: true },
    ],
    databaseSchema: [
      {
        tableName: "users",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "email", type: "VARCHAR(255)", constraints: "UNIQUE, NOT NULL" },
          { name: "password_hash", type: "VARCHAR(255)", constraints: "NOT NULL" },
          { name: "name", type: "VARCHAR(120)", constraints: "NOT NULL" },
          { name: "role", type: "VARCHAR(50)", constraints: "DEFAULT 'user'" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["has many resources", "has many notifications"],
      },
      {
        tableName: "resources",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "user_id", type: "UUID", constraints: "FOREIGN KEY -> users.id" },
          { name: "title", type: "VARCHAR(255)", constraints: "NOT NULL" },
          { name: "description", type: "TEXT", constraints: "NULLABLE" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["belongs to user"],
      },
      {
        tableName: "notifications",
        fields: [
          { name: "id", type: "UUID", constraints: "PRIMARY KEY" },
          { name: "user_id", type: "UUID", constraints: "FOREIGN KEY -> users.id" },
          { name: "message", type: "TEXT", constraints: "NOT NULL" },
          { name: "read", type: "BOOLEAN", constraints: "DEFAULT FALSE" },
          { name: "created_at", type: "TIMESTAMP", constraints: "DEFAULT NOW()" },
        ],
        relations: ["belongs to user"],
      },
    ],
    authStrategy: {
      method: "JWT with Refresh Tokens",
      description: "Stateless authentication using short-lived access tokens and long-lived refresh tokens, allowing horizontal scaling without shared session storage.",
      flows: [
        "User registers with email + password; password is hashed with bcrypt before storage.",
        "User logs in; server issues a short-lived JWT access token (15 min) and a long-lived refresh token (7 days).",
        "Access token is sent as a Bearer token on every authenticated request.",
        "When the access token expires, the client calls /api/auth/refresh with the refresh token to get a new access token.",
        "Refresh tokens are stored hashed in the database so they can be revoked on logout or suspicious activity.",
      ],
      roles: ["Admin", "User", "Guest"],
    },
    roadmap: [
      { phase: "Phase 1: Foundation", duration: "Week 1", goals: ["Project scaffolding", "Auth flow", "Base layout & routing"] },
      { phase: "Phase 2: Core Features", duration: "Week 2-3", goals: ["CRUD for core resources", "Core business logic", "API integration"] },
      { phase: "Phase 3: Polish", duration: "Week 4", goals: ["Responsive design", "Error & empty states", "Testing"] },
      { phase: "Phase 4: Launch", duration: "Week 5", goals: ["Deployment pipeline", "Monitoring & logging", "Documentation"] },
    ],
    sprints: [
      { sprintNumber: 1, title: "Foundation Sprint", duration: "Week 1-2", goal: "Ship a working auth flow and base app shell", deliverables: ["Project scaffolding", "Register/login endpoints", "Protected route middleware", "Base layout & nav"] },
      { sprintNumber: 2, title: "Core CRUD Sprint", duration: "Week 3-4", goal: "Users can create and manage core resources end-to-end", deliverables: ["Resource CRUD API", "Resource list & detail UI", "Form validation", "Empty & error states"] },
      { sprintNumber: 3, title: "Engagement Sprint", duration: "Week 5-6", goal: "Add notifications and polish the core experience", deliverables: ["Notifications system", "Responsive breakpoints", "Loading skeletons", "Accessibility pass"] },
      { sprintNumber: 4, title: "Launch Sprint", duration: "Week 7-8", goal: "Ship to production with monitoring in place", deliverables: ["CI/CD pipeline", "Error monitoring", "Analytics", "Production deployment"] },
    ],
    tasks: [
      { id: "T1", title: "Set up project scaffolding and CI", priority: "High", estimate: "2h", phase: "Phase 1: Foundation" },
      { id: "T2", title: "Implement register/login endpoints", priority: "High", estimate: "4h", phase: "Phase 1: Foundation" },
      { id: "T3", title: "Design and migrate database schema", priority: "High", estimate: "3h", phase: "Phase 1: Foundation" },
      { id: "T4", title: "Build base layout, nav, and routing", priority: "Medium", estimate: "3h", phase: "Phase 1: Foundation" },
      { id: "T5", title: "Build core resource CRUD APIs", priority: "High", estimate: "6h", phase: "Phase 2: Core Features" },
      { id: "T6", title: "Build resource list & detail UI", priority: "High", estimate: "5h", phase: "Phase 2: Core Features" },
      { id: "T7", title: "Wire notifications system", priority: "Medium", estimate: "4h", phase: "Phase 2: Core Features" },
      { id: "T8", title: "Add form validation across app", priority: "Medium", estimate: "2h", phase: "Phase 3: Polish" },
      { id: "T9", title: "Implement responsive breakpoints", priority: "Medium", estimate: "3h", phase: "Phase 3: Polish" },
      { id: "T10", title: "Write unit + integration tests", priority: "Medium", estimate: "5h", phase: "Phase 3: Polish" },
      { id: "T11", title: "Set up deployment pipeline", priority: "Low", estimate: "3h", phase: "Phase 4: Launch" },
      { id: "T12", title: "Add logging & error monitoring", priority: "Low", estimate: "2h", phase: "Phase 4: Launch" },
    ],
    futureScope: [
      { title: "Team Collaboration", description: "Allow multiple users to share and co-edit resources within an organization workspace.", impact: "High" },
      { title: "Real-time Sync", description: "WebSocket-based live updates so changes appear instantly across all connected clients.", impact: "Medium" },
      { title: "Mobile App", description: "React Native companion app sharing the same API layer.", impact: "Medium" },
      { title: "Advanced Analytics", description: "Usage dashboards and exportable reports for admins.", impact: "Low" },
    ],
    readme: `# ${projectName}\n\n## Overview\n${idea}\n\n## Features\n- User authentication with JWT\n- Core resource management\n- Real-time notifications\n\n## Tech Stack\n- React, TypeScript, Vite\n- Node.js, Express, Prisma\n- PostgreSQL\n\n## Getting Started\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Folder Structure\n\`\`\`\nsrc/\n├── components/\n├── pages/\n├── services/\n└── App.tsx\n\`\`\`\n\n## License\nMIT`,
  };
}
