import type { DomainProfile } from "./domainKnowledge.ts";

export function buildBlueprintPrompt(idea: string, domain?: DomainProfile, requirements?: Record<string, unknown>): string {
  return `You are a Senior Staff Software Engineer designing a production system, not a generic tutorial.

USER IDEA:\n${idea}

DETECTED DOMAIN:\n${domain ? JSON.stringify(domain) : "Infer the domain from the idea"}

EXTRACTED REQUIREMENTS:\n${requirements ? JSON.stringify(requirements) : "Extract actors, workflows, constraints, integrations, and measurable outcomes"}

Generate a complete implementation blueprint as strict JSON. Every decision must be traceable to this idea. Do not reuse a generic five-layer architecture. Invent domain-appropriate boundaries, entities, workflows, events, integrations, metrics, and failure states.

Mandatory specificity rules:
- Architecture layer names must describe this product's actual boundaries, not generic labels like Presentation Layer or Persistence Layer.
- Database tables must be domain nouns from the idea and include relationships, indexes, lifecycle/status fields, and audit considerations.
- APIs must expose the product's real workflows and include idempotency, authorization, pagination, or webhooks where relevant.
- Choose integrations and infrastructure based on the domain and stated constraints.
- Roadmap, sprints, and tasks must use the product's nouns and verbs.
- Avoid filler phrases, copied examples, and unrelated features. Never mention that you are using a fallback.
- Return valid JSON only with the requested schema and no markdown fences.

Include architecture, folder structure, tech stack, database schema, API endpoints, authentication strategy, roadmap, sprints, tasks, README, and future enhancements.`;
}
