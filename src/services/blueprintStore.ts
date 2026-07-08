import type { ProjectBlueprint, SavedBlueprint } from "../types/blueprint.types";

const STORAGE_KEY = "taskflow_ai_blueprints";

function readAll(): SavedBlueprint[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedBlueprint[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(blueprints: SavedBlueprint[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blueprints));
  } catch (err) {
    console.error("Failed to persist blueprints:", err);
  }
}

export function listBlueprints(): SavedBlueprint[] {
  return readAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getBlueprintById(id: string): SavedBlueprint | undefined {
  return readAll().find((b) => b.id === id);
}

export function saveBlueprint(idea: string, blueprint: ProjectBlueprint): SavedBlueprint {
  const record: SavedBlueprint = {
    id: crypto.randomUUID(),
    idea,
    createdAt: new Date().toISOString(),
    blueprint,
  };
  const all = readAll();
  all.push(record);
  writeAll(all);
  return record;
}

export function deleteBlueprint(id: string): void {
  const all = readAll().filter((b) => b.id !== id);
  writeAll(all);
}

export interface BlueprintStats {
  totalBlueprints: number;
  totalApiEndpoints: number;
  totalDbTables: number;
  totalTasks: number;
  generatedThisWeek: number;
}

export function computeStats(): BlueprintStats {
  const all = readAll();
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  return {
    totalBlueprints: all.length,
    totalApiEndpoints: all.reduce((sum, b) => sum + b.blueprint.apiDesign.length, 0),
    totalDbTables: all.reduce((sum, b) => sum + b.blueprint.databaseSchema.length, 0),
    totalTasks: all.reduce((sum, b) => sum + b.blueprint.tasks.length, 0),
    generatedThisWeek: all.filter((b) => new Date(b.createdAt).getTime() >= oneWeekAgo).length,
  };
}
