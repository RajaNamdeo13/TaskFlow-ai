import type { ProjectBlueprint } from "../types/blueprint.types";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "");

interface GenerateBlueprintResponse {
  blueprint: ProjectBlueprint;
  source: "gemini" | "demo";
}

export function isApiConfigured(): boolean {
  return Boolean(API_BASE_URL);
}

export async function generateBlueprintFromApi(idea: string): Promise<ProjectBlueprint> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const response = await fetch(`${API_BASE_URL}/api/blueprints/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    throw new Error(payload?.error?.message ?? "Blueprint generation failed.");
  }

  const payload = await response.json() as GenerateBlueprintResponse;
  return payload.blueprint;
}
