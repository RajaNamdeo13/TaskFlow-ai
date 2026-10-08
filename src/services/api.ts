import type { ProjectBlueprint, SavedBlueprint } from "../types/blueprint.types";

const API_BASE_URL = ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "").replace(/\/$/, "");
export interface User { id: string; email: string; name: string; role: "USER" | "ADMIN"; createdAt: string; }
export interface AuthResponse { user: User; workspace?: { id: string; name: string }; workspaceId?: string; }
export interface BlueprintStats { totalBlueprints: number; totalApiEndpoints: number; totalDbTables: number; totalTasks: number; generatedThisWeek: number; }
async function request<T>(path: string, init: RequestInit = {}): Promise<T> { const response = await fetch(`${API_BASE_URL}${path}`, { ...init, credentials: "include", headers: { "Content-Type": "application/json", ...(init.headers ?? {}) } }); if (!response.ok) { const payload = await response.json().catch(() => null) as { error?: { message?: string } } | null; throw new Error(payload?.error?.message ?? `Request failed (${response.status})`); } if (response.status === 204) return undefined as T; return response.json() as Promise<T>; }
export const api = {
  me: () => request<{ user: User; workspaceId: string }>("/api/auth/me"),
  login: (input: { email: string; password: string }) => request<AuthResponse>("/api/auth/login", { method: "POST", body: JSON.stringify(input) }),
  register: (input: { name: string; email: string; password: string }) => request<AuthResponse>("/api/auth/register", { method: "POST", body: JSON.stringify(input) }),
  refresh: () => request<AuthResponse>("/api/auth/refresh", { method: "POST" }),
  logout: () => request<void>("/api/auth/logout", { method: "POST" }),
  listBlueprints: (search = "") => request<{ blueprints: SavedBlueprint[] }>(`/api/blueprints${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  stats: () => request<BlueprintStats>("/api/blueprints/stats"),
  getBlueprint: (id: string) => request<SavedBlueprint>(`/api/blueprints/${id}`),
  generate: (idea: string) => request<SavedBlueprint>("/api/blueprints/generate", { method: "POST", body: JSON.stringify({ idea }) }),
  deleteBlueprint: (id: string) => request<void>(`/api/blueprints/${id}`, { method: "DELETE" }),
  exportUrl: (id: string, format: "json" | "readme" | "sql") => `${API_BASE_URL}/api/blueprints/${id}/export/${format}`,
};

export function isApiConfigured() { return Boolean(API_BASE_URL); }
export type { ProjectBlueprint };
