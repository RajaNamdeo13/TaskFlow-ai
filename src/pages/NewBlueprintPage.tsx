import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlueprintGenerator } from "../hooks/useBlueprintGenerator";
import { IdeaInput } from "../components/dashboard/IdeaInput";
import { LoadingState } from "../components/dashboard/LoadingState";
import { saveBlueprint } from "../services/blueprintStore";

export function NewBlueprintPage() {
  const { status, blueprint, error, generate, currentIdea } = useBlueprintGenerator();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" && blueprint) {
      const saved = saveBlueprint(currentIdea, blueprint);
      navigate(`/dashboard/blueprint/${saved.id}`, { replace: true });
    }
  }, [status, blueprint, currentIdea, navigate]);

  return (
    <div className="px-8 py-16">
      {status === "loading" ? (
        <LoadingState />
      ) : (
        <IdeaInput onGenerate={generate} isLoading={false} error={error} />
      )}
    </div>
  );
}
