import { Badge } from "../ui/Badge";
import type { Task } from "../../types/blueprint.types";

interface TaskBreakdownViewProps {
  tasks: Task[];
}

export function TaskBreakdownView({ tasks }: TaskBreakdownViewProps) {
  const phases = Array.from(new Set(tasks.map((t) => t.phase)));

  return (
    <div className="space-y-8">
      {phases.map((phase) => {
        const phaseTasks = tasks.filter((t) => t.phase === phase);
        return (
          <div key={phase}>
            <div className="flex items-center gap-3 mb-3">
              <h4 className="font-mono text-xs text-paper-500 uppercase tracking-wide">{phase}</h4>
              <div className="h-px flex-1 bg-white/5" />
              <span className="font-mono text-xs text-paper-500">{phaseTasks.length} tasks</span>
            </div>

            <div className="glass-panel divide-y divide-white/5">
              {phaseTasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center gap-4">
                  <span className="font-mono text-xs text-paper-500 w-10 shrink-0">{task.id}</span>
                  <span className="text-sm text-paper-100 flex-1">{task.title}</span>
                  <span className="font-mono text-xs text-paper-500 hidden sm:inline">{task.estimate}</span>
                  <Badge variant={task.priority.toLowerCase() as "high" | "medium" | "low"}>{task.priority}</Badge>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
