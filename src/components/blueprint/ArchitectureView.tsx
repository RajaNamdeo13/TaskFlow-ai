import { Card } from "../ui/Card";
import { Layers } from "lucide-react";
import type { ArchitectureLayer, TechStackItem } from "../../types/blueprint.types";

interface ArchitectureViewProps {
  architecture: ArchitectureLayer[];
  techStack: TechStackItem[];
  folderStructure: string;
}

export function ArchitectureView({ architecture, techStack, folderStructure }: ArchitectureViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-4 flex items-center gap-2">
          <Layers size={18} className="text-signal-400" /> System Layers
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {architecture.map((layer, i) => (
            <Card key={layer.name} delay={i * 0.05}>
              <p className="font-mono text-xs text-line-400 mb-2">LAYER {String(i + 1).padStart(2, "0")}</p>
              <h4 className="font-semibold text-base mb-2">{layer.name}</h4>
              <p className="text-sm text-paper-300 mb-4 leading-relaxed">{layer.description}</p>
              <div className="flex flex-wrap gap-2">
                {layer.components.map((c) => (
                  <span key={c} className="text-xs font-mono px-2 py-1 rounded-md bg-ink-800 text-paper-300 border border-white/5">
                    {c}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-4">Tech Stack</h3>
        <div className="glass-panel divide-y divide-white/5">
          {techStack.map((item) => (
            <div key={item.category} className="p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="font-mono text-xs text-paper-500 w-32 shrink-0">{item.category}</span>
              <span className="font-medium text-paper-100 w-48 shrink-0">{item.choice}</span>
              <span className="text-sm text-paper-300">{item.reason}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-4">Folder Structure</h3>
        <Card>
          <pre className="font-mono text-sm text-paper-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {folderStructure}
          </pre>
        </Card>
      </div>
    </div>
  );
}
