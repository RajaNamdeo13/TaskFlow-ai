import { Card } from "../ui/Card";
import { Database, ArrowRight } from "lucide-react";
import type { DbTable } from "../../types/blueprint.types";

interface SchemaViewProps {
  tables: DbTable[];
}

export function SchemaView({ tables }: SchemaViewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {tables.map((table, i) => (
        <Card key={table.tableName} delay={i * 0.05} corners>
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-line-400" />
            <h4 className="font-mono font-semibold text-paper-100">{table.tableName}</h4>
          </div>

          <div className="space-y-1.5 mb-4">
            {table.fields.map((field) => (
              <div key={field.name} className="flex items-center justify-between text-sm py-1.5 border-b border-white/5 last:border-0">
                <span className="font-mono text-paper-100">{field.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-signal-400">{field.type}</span>
                  <span className="font-mono text-[10px] text-paper-500 uppercase">{field.constraints}</span>
                </div>
              </div>
            ))}
          </div>

          {table.relations.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {table.relations.map((rel) => (
                <span key={rel} className="inline-flex items-center gap-1 text-xs font-mono text-line-400 bg-line-500/10 px-2 py-1 rounded-md">
                  <ArrowRight size={10} /> {rel}
                </span>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
