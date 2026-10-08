import type { ProjectBlueprint } from "../../../src/types/blueprint.types.ts";
export function toJson(blueprint: ProjectBlueprint) { return JSON.stringify(blueprint, null, 2); }
export function toReadme(blueprint: ProjectBlueprint) { return blueprint.readme; }
export function toSql(blueprint: ProjectBlueprint) { return blueprint.databaseSchema.map(table => { const fields = table.fields.map(field => `  ${field.name} ${field.type} ${field.constraints}`).join(",\n"); return `CREATE TABLE ${table.tableName} (\n${fields}\n);`; }).join("\n\n"); }
