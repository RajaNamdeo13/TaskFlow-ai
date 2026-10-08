import { motion } from "framer-motion";
import { CheckCircle2, Target } from "lucide-react";
import type { Sprint } from "../../types/blueprint.types";

interface SprintPlanViewProps {
  sprints: Sprint[];
}

export function SprintPlanView({ sprints }: SprintPlanViewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {sprints.map((sprint, i) => (
        <motion.div
          key={sprint.sprintNumber}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="glass-panel glass-panel-hover p-5 blueprint-corners"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-line-400 bg-line-500/10 px-2 py-1 rounded-md">
              SPRINT {sprint.sprintNumber}
            </span>
            <span className="font-mono text-xs text-paper-500">{sprint.duration}</span>
          </div>

          <h4 className="font-[family-name:var(--font-display)] font-semibold text-base mb-2">{sprint.title}</h4>

          <div className="flex items-start gap-2 mb-4 text-sm text-paper-300">
            <Target size={14} className="text-signal-400 mt-0.5 shrink-0" />
            {sprint.goal}
          </div>

          <div className="pt-3 border-t border-white/5">
            <p className="font-mono text-xs text-paper-500 mb-2">DELIVERABLES</p>
            <ul className="space-y-1.5">
              {sprint.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-paper-300">
                  <CheckCircle2 size={13} className="text-line-400 mt-0.5 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
