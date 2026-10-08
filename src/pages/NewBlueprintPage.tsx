import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlueprintGenerator } from "../hooks/useBlueprintGenerator";
import { IdeaInput } from "../components/dashboard/IdeaInput";
import { LoadingState } from "../components/dashboard/LoadingState";
export function NewBlueprintPage() { const { status, blueprint, savedId, error, generate } = useBlueprintGenerator(); const navigate = useNavigate(); useEffect(() => { if (status === "success" && blueprint && savedId) navigate(`/dashboard/blueprint/${savedId}`, { replace: true }); }, [status, blueprint, savedId, navigate]); return <div className="px-8 py-16">{status === "loading" ? <LoadingState /> : <IdeaInput onGenerate={generate} isLoading={false} error={error} />}</div>; }
