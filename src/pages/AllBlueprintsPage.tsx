import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { BlueprintCard } from "../components/dashboard/BlueprintCard";
import { Button } from "../components/ui/Button";
import { listBlueprints, deleteBlueprint } from "../services/blueprintStore";
import type { SavedBlueprint } from "../types/blueprint.types";

export function AllBlueprintsPage() {
  const [blueprints, setBlueprints] = useState<SavedBlueprint[]>([]);

  useEffect(() => {
    setBlueprints(listBlueprints());
  }, []);

  function handleDelete(id: string) {
    deleteBlueprint(id);
    setBlueprints(listBlueprints());
  }

  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="font-mono text-sm text-line-400 mb-2">ALL BLUEPRINTS</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {blueprints.length} {blueprints.length === 1 ? "blueprint" : "blueprints"}
          </h1>
        </div>
        <Link to="/dashboard/new">
          <Button className="flex items-center gap-2">
            <Sparkles size={16} /> Generate Blueprint
          </Button>
        </Link>
      </div>

      {blueprints.length === 0 ? (
        <div className="glass-panel p-12 text-center blueprint-corners">
          <p className="text-paper-300 mb-1">No blueprints yet</p>
          <p className="text-sm text-paper-500">Generate one to see it listed here.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blueprints.map((b, i) => (
            <BlueprintCard key={b.id} saved={b} onDelete={handleDelete} delay={i * 0.04} />
          ))}
        </div>
      )}
    </div>
  );
}
