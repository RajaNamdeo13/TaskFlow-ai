import { TrendingUp } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { FutureEnhancement } from "../../types/blueprint.types";

interface FutureScopeViewProps {
  items: FutureEnhancement[];
}

export function FutureScopeView({ items }: FutureScopeViewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {items.map((item, i) => (
        <Card key={item.title} delay={i * 0.05}>
          <div className="flex items-start justify-between mb-3 gap-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-line-400" />
              <h4 className="font-semibold text-base">{item.title}</h4>
            </div>
            <Badge variant={item.impact.toLowerCase() as "high" | "medium" | "low"}>{item.impact} Impact</Badge>
          </div>
          <p className="text-sm text-paper-300 leading-relaxed">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
