import { ShieldCheck, Users, Workflow } from "lucide-react";
import { Card } from "../ui/Card";
import type { AuthStrategy } from "../../types/blueprint.types";

interface AuthStrategyViewProps {
  auth: AuthStrategy;
}

export function AuthStrategyView({ auth }: AuthStrategyViewProps) {
  return (
    <div className="space-y-6">
      <Card corners>
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={18} className="text-signal-400" />
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg">{auth.method}</h3>
        </div>
        <p className="text-sm text-paper-300 leading-relaxed">{auth.description}</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-5">
        <Card delay={0.05}>
          <div className="flex items-center gap-2 mb-4">
            <Workflow size={16} className="text-line-400" />
            <h4 className="font-semibold text-sm">Authentication Flow</h4>
          </div>
          <ol className="space-y-3">
            {auth.flows.map((flow, i) => (
              <li key={flow} className="flex gap-3 text-sm text-paper-300">
                <span className="font-mono text-xs text-line-400 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                {flow}
              </li>
            ))}
          </ol>
        </Card>

        <Card delay={0.1}>
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-line-400" />
            <h4 className="font-semibold text-sm">User Roles</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {auth.roles.map((role) => (
              <span key={role} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-signal-500/10 text-signal-400 border border-signal-500/20">
                {role}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
