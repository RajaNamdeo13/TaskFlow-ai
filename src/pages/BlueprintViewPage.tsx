import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, Sparkles, Download } from "lucide-react";
import { BlueprintTabs } from "../components/blueprint/BlueprintTabs";
import { GenerationTraceCard } from "../components/blueprint/GenerationTraceCard";
import { Button } from "../components/ui/Button";
import { api } from "../services/api";
import type { SavedBlueprint } from "../types/blueprint.types";

export function BlueprintViewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [saved, setSaved] = useState<SavedBlueprint | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    void api.getBlueprint(id).then(setSaved).catch(err => { setError(err instanceof Error ? err.message : "Blueprint not found."); setSaved(null); });
  }, [id]);

  const handleDelete = async () => { if (!id) return; await api.deleteBlueprint(id); navigate("/dashboard"); };
  if (saved === undefined) return <div className="px-8 py-16 text-paper-500 font-mono text-sm">Loading blueprint...</div>;
  if (saved === null) return <div className="px-8 py-16"><p className="text-paper-300 mb-4">{error ?? "Blueprint not found."}</p><Link to="/dashboard" className="text-signal-400 text-sm">← Back to dashboard</Link></div>;

  return <div className="px-8 py-10 max-w-5xl">
    <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-paper-500 hover:text-paper-300 mb-6"><ArrowLeft size={14} /> Back to dashboard</Link>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8 flex-wrap gap-4">
      <div><p className="font-mono text-xs text-line-400 mb-2">{saved.source?.toUpperCase() ?? "BLUEPRINT"} · POSTGRESQL RECORD</p><h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-2">{saved.projectName}</h1><p className="text-paper-300 text-sm max-w-2xl">{saved.blueprint.summary}</p></div>
      <div className="flex items-center gap-2 shrink-0"><Link to="/dashboard/new"><Button variant="secondary" className="flex items-center gap-2"><Sparkles size={14} /> New</Button></Link><a href={api.exportUrl(saved.id, "readme")} target="_blank" rel="noreferrer"><Button variant="secondary" className="flex items-center gap-2"><Download size={14} /> README</Button></a><Button variant="secondary" onClick={() => void handleDelete()} className="flex items-center gap-2 hover:!border-rose-500/40 hover:!text-rose-400"><Trash2 size={14} /></Button></div>
    </motion.div>
    <GenerationTraceCard blueprint={saved.blueprint} source={saved.source} />
    <BlueprintTabs blueprint={saved.blueprint} />
  </div>;
}
