import { GoogleGenAI } from "@google/genai";
import type { ProjectBlueprint } from "../../../src/types/blueprint.types.ts";
import { env } from "../config/env.ts";
import { buildBlueprintPrompt } from "./blueprintPrompt.ts";
import { blueprintResponseSchema } from "./blueprintSchema.ts";
import { createDemoBlueprint } from "./demoBlueprint.ts";

const client = env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY }) : null;

export interface GenerateBlueprintInput {
  idea: string;
}

export interface GenerateBlueprintResult {
  blueprint: ProjectBlueprint;
  source: "gemini" | "demo";
}

export async function generateBlueprint(input: GenerateBlueprintInput): Promise<GenerateBlueprintResult> {
  const idea = input.idea.trim();

  if (!client) {
    return { blueprint: createDemoBlueprint(idea), source: "demo" };
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: buildBlueprintPrompt(idea),
      config: {
        responseMimeType: "application/json",
        responseSchema: blueprintResponseSchema,
        temperature: 0.55,
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response");
    }

    return {
      blueprint: JSON.parse(response.text) as ProjectBlueprint,
      source: "gemini",
    };
  } catch (err) {
    console.error("Gemini generation failed; using demo blueprint.", err);
    return { blueprint: createDemoBlueprint(idea), source: "demo" };
  }
}
