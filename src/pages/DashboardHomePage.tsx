import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, FileCode2, Database, ListChecks, ArrowRight } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { BlueprintCard } from "../components/dashboard/BlueprintCard";
import { Button } from "../components/ui/Button";
import { listBlueprints, deleteBlueprint, computeStats } from "../services/blueprintStore";
import type { SavedBlueprint } from "../types/blueprint.types";

export function DashboardHomePage() {
  const [blueprints, setBlueprints] = useState<SavedBlueprint[]>([]);
  const [stats, setStats] = useState(computeStats());

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setBlueprints(listBlueprints());
    setStats(computeStats());
  }

  function handleDelete(id: string) {
    deleteBlueprint(id);
    refresh();
  }

  const recent = blueprints.slice(0, 6);

  return (
    <div className="px-8 py-10 max-w-6xl">
      <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
        <div>
          <p className="font-mono text-sm text-line-400 mb-2">OVERVIEW</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            Welcome back
          </h1>
        </div>
        <Link to="/dashboard/new">
          <Button className="flex items-center gap-2">
            <Sparkles size={16} /> Generate Blueprint
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard icon={Sparkles} label="Blueprints" value={stats.totalBlueprints} delay={0} />
        <StatCard icon={FileCode2} label="API Endpoints Designed" value={stats.totalApiEndpoints} delay={0.05} />
        <StatCard icon={Database} label="DB Tables Designed" value={stats.totalDbTables} delay={0.1} />
        <StatCard icon={ListChecks} label="Tasks Planned" value={stats.totalTasks} delay={0.15} />
      </div>

      <div className="flex items-center justify-between mb-5">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">Recent Blueprints</h2>
        {blueprints.length > 6 && (
          <Link to="/dashboard/blueprints" className="text-sm text-signal-400 flex items-center gap-1 hover:gap-2 transition-all">
            View all <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {recent.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-12 text-center blueprint-corners">
          <Sparkles size={28} className="text-signal-400 mx-auto mb-4" />
          <p className="text-paper-300 mb-1">No blueprints yet</p>
          <p className="text-sm text-paper-500 mb-6">Generate your first AI-powered software blueprint to see it here.</p>
          <Link to="/dashboard/new">
            <Button className="inline-flex items-center gap-2">
              <Sparkles size={16} /> Generate Your First Blueprint
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((b, i) => (
            <BlueprintCard key={b.id} saved={b} onDelete={handleDelete} delay={i * 0.05} />
          ))}
        </div>
      )}
    </div>
  );
}
