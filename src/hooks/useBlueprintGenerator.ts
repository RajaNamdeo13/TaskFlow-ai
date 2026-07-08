import { useCallback, useState } from "react";
import { generateBlueprint } from "../services/geminiService";
import type { GenerationStatus, ProjectBlueprint } from "../types/blueprint.types";

interface UseBlueprintGeneratorResult {
  status: GenerationStatus;
  blueprint: ProjectBlueprint | null;
  error: string | null;
  currentIdea: string;
  generate: (idea: string) => Promise<void>;
  reset: () => void;
}

export function useBlueprintGenerator(): UseBlueprintGeneratorResult {
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIdea, setCurrentIdea] = useState("");

  const generate = useCallback(async (idea: string) => {
    if (!idea.trim()) {
      setError("Please describe your project idea first.");
      setStatus("error");
      return;
    }

    setCurrentIdea(idea);
    setStatus("loading");
    setError(null);

    try {
      const result = await generateBlueprint(idea);
      setBlueprint(result);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong generating your blueprint.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setBlueprint(null);
    setError(null);
    setCurrentIdea("");
  }, []);

  return { status, blueprint, error, currentIdea, generate, reset };
}
