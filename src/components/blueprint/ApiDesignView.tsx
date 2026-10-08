import { useState } from "react";
import { ChevronDown, Lock, Unlock } from "lucide-react";
import { Badge } from "../ui/Badge";
import type { ApiEndpoint } from "../../types/blueprint.types";

interface ApiDesignViewProps {
  endpoints: ApiEndpoint[];
}

export function ApiDesignView({ endpoints }: ApiDesignViewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {endpoints.map((endpoint, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={`${endpoint.method}-${endpoint.path}`} className="glass-panel overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center gap-4 p-4 text-left"
            >
              <Badge variant={endpoint.method.toLowerCase() as "get" | "post" | "put" | "patch" | "delete"}>
                {endpoint.method}
              </Badge>
              <code className="font-mono text-sm text-paper-100 flex-1">{endpoint.path}</code>
              {endpoint.authRequired ? (
                <Lock size={14} className="text-amber-400" />
              ) : (
                <Unlock size={14} className="text-paper-500" />
              )}
              <ChevronDown
                size={16}
                className={`text-paper-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-white/5">
                <p className="text-sm text-paper-300 mb-4">{endpoint.description}</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {endpoint.requestBody && (
                    <div>
                      <p className="font-mono text-xs text-paper-500 mb-1">REQUEST BODY</p>
                      <code className="block font-mono text-xs bg-ink-800 rounded-lg p-3 text-line-400 overflow-x-auto">
                        {endpoint.requestBody}
                      </code>
                    </div>
                  )}
                  {endpoint.responseBody && (
                    <div>
                      <p className="font-mono text-xs text-paper-500 mb-1">RESPONSE</p>
                      <code className="block font-mono text-xs bg-ink-800 rounded-lg p-3 text-signal-400 overflow-x-auto">
                        {endpoint.responseBody}
                      </code>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
