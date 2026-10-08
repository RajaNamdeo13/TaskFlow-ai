import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { RoadmapPhase } from "../../types/blueprint.types";

interface RoadmapViewProps {
  roadmap: RoadmapPhase[];
}

export function RoadmapView({ roadmap }: RoadmapViewProps) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-signal-500/60 via-line-500/40 to-transparent" />

      <div className="space-y-8">
        {roadmap.map((phase, i) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative"
          >
            <div className="absolute -left-8 top-1 w-5 h-5 rounded-full bg-ink-900 border-2 border-signal-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-signal-400" />
            </div>

            <div className="glass-panel glass-panel-hover p-5">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <h4 className="font-[family-name:var(--font-display)] font-semibold text-base">{phase.phase}</h4>
                <span className="font-mono text-xs text-line-400 bg-line-500/10 px-2 py-1 rounded-md">
                  {phase.duration}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2 text-sm text-paper-300">
                    <CheckCircle2 size={14} className="text-signal-400 mt-0.5 shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
