import { GoogleGenAI } from "@google/genai";
import type { ProjectBlueprint } from "../../../src/types/blueprint.types.ts";
import { env } from "../config/env.ts";
import { buildBlueprintPrompt } from "./blueprintPrompt.ts";
import { blueprintResponseSchema } from "./blueprintSchema.ts";
import { createDemoBlueprint } from "./demoBlueprint.ts";
import { detectDomain, extractRequirements, retrieveKnowledge } from "./domainKnowledge.ts";
import { personalizeDemo, validateBlueprint } from "./blueprintQuality.ts";

const client = env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: env.GEMINI_API_KEY }) : null;

export interface GenerateBlueprintInput {
  idea: string;
}

export interface GenerateBlueprintResult {
  blueprint: ProjectBlueprint;
  source: "gemini" | "demo";
  trace: { domain: ReturnType<typeof detectDomain>; requirements: ReturnType<typeof extractRequirements>; knowledge: ReturnType<typeof retrieveKnowledge>; warnings: string[] };
}

export async function generateBlueprint(input: GenerateBlueprintInput): Promise<GenerateBlueprintResult> {
  const idea = input.idea.trim();

  const domain = detectDomain(idea);
  const requirements = extractRequirements(idea, domain);
  const knowledge = retrieveKnowledge(domain);
  const fallback = () => { const blueprint = personalizeDemo(createDemoBlueprint(idea), idea, domain); return { blueprint, source: "demo" as const, trace: { domain, requirements, knowledge, warnings: validateBlueprint(blueprint) } }; };
  if (!client) return fallback();

  try {
    const response = await client.models.generateContent({
      model: env.GEMINI_MODEL,
      contents: buildBlueprintPrompt(idea, domain, requirements),
      config: {
        responseMimeType: "application/json",
        responseSchema: blueprintResponseSchema,
        temperature: 0.55,
      },
    });

    if (!response.text) {
      throw new Error("Gemini returned an empty response");
    }

    const blueprint = personalizeDemo(JSON.parse(response.text) as ProjectBlueprint, idea, domain);
    return { blueprint, source: "gemini", trace: { domain, requirements, knowledge, warnings: validateBlueprint(blueprint) } };
  } catch (err) {
    console.error("Gemini generation failed; using demo blueprint.", err);
    return fallback();
  }
}
