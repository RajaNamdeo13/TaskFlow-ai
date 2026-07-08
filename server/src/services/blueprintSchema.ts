import { Type } from "@google/genai";

export const blueprintResponseSchema = {
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
