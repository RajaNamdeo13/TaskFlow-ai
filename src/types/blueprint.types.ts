export interface TechStackItem { category: string; choice: string; reason: string; }
export interface ArchitectureLayer { name: string; description: string; components: string[]; }
export interface ApiEndpoint { method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; path: string; description: string; requestBody?: string; responseBody?: string; authRequired: boolean; }
export interface DbField { name: string; type: string; constraints: string; }
export interface DbTable { tableName: string; fields: DbField[]; relations: string[]; }
export interface AuthStrategy { method: string; description: string; flows: string[]; roles: string[]; }
export interface RoadmapPhase { phase: string; duration: string; goals: string[]; }
export interface Sprint { sprintNumber: number; title: string; duration: string; goal: string; deliverables: string[]; }
export interface Task { id: string; title: string; priority: "High" | "Medium" | "Low"; estimate: string; phase: string; }
export interface FutureEnhancement { title: string; description: string; impact: "High" | "Medium" | "Low"; }
export interface DomainSignal { key: string; label: string; entity: string; verbs: string[]; tables: string[]; routes: string[]; stack: string[]; }
export interface GenerationTrace { domain: DomainSignal; requirements: Record<string, unknown>; knowledge: { title: string; content: string; source: string }[]; warnings: string[]; }
export interface ProjectBlueprint { projectName: string; summary: string; techStack: TechStackItem[]; folderStructure: string; architecture: ArchitectureLayer[]; apiDesign: ApiEndpoint[]; databaseSchema: DbTable[]; authStrategy: AuthStrategy; roadmap: RoadmapPhase[]; sprints: Sprint[]; tasks: Task[]; futureScope: FutureEnhancement[]; readme: string; trace?: GenerationTrace; }
export type GenerationStatus = "idle" | "loading" | "success" | "error";
export type BlueprintTabId = "architecture" | "api" | "schema" | "auth" | "roadmap" | "sprints" | "tasks" | "future" | "readme";
export interface SavedBlueprint { id: string; idea: string; projectName: string; source?: "gemini" | "demo"; createdAt: string; updatedAt?: string; blueprint: ProjectBlueprint; }
