import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ArrowUpRight } from "lucide-react";
import type { SavedBlueprint } from "../../types/blueprint.types";

interface BlueprintCardProps {
  saved: SavedBlueprint;
  onDelete?: (id: string) => void;
  delay?: number;
}

export function BlueprintCard({ saved, onDelete, delay = 0 }: BlueprintCardProps) {
  const date = new Date(saved.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel glass-panel-hover p-5 group relative"
    >
      <Link to={`/dashboard/blueprint/${saved.id}`} className="block">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-[family-name:var(--font-display)] font-semibold text-base pr-6 line-clamp-1">
            {saved.blueprint.projectName}
          </h4>
          <ArrowUpRight size={16} className="text-paper-500 group-hover:text-signal-400 transition-colors shrink-0" />
        </div>
        <p className="text-sm text-paper-300 line-clamp-2 mb-4">{saved.idea}</p>
        <div className="flex items-center gap-3 text-xs font-mono text-paper-500">
          <span>{date}</span>
          <span>·</span>
          <span>{saved.blueprint.apiDesign.length} endpoints</span>
          <span>·</span>
          <span>{saved.blueprint.databaseSchema.length} tables</span>
        </div>
      </Link>

      {onDelete && (
        <button
          onClick={() => onDelete(saved.id)}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-rose-500/15 text-paper-500 hover:text-rose-400"
          aria-label="Delete blueprint"
        >
          <Trash2 size={14} />
        </button>
      )}
    </motion.div>
  );
}
