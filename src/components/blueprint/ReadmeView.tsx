import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Download, Eye, Code } from "lucide-react";
import { Button } from "../ui/Button";
import "../../markdown-preview.css";

interface ReadmeViewProps {
  readme: string;
  projectName: string;
}

export function ReadmeView({ readme, projectName }: ReadmeViewProps) {
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"preview" | "raw">("preview");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([readme], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/5 flex-wrap gap-3">
        <span className="font-mono text-xs text-paper-500">README.md · {projectName}</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-white/10 overflow-hidden">
            <button
              onClick={() => setMode("preview")}
              className={`px-3 py-2 text-xs flex items-center gap-1.5 transition-colors ${
                mode === "preview" ? "bg-signal-500/15 text-signal-400" : "text-paper-400 hover:bg-white/[0.03]"
              }`}
            >
              <Eye size={13} /> Preview
            </button>
            <button
              onClick={() => setMode("raw")}
              className={`px-3 py-2 text-xs flex items-center gap-1.5 transition-colors ${
                mode === "raw" ? "bg-signal-500/15 text-signal-400" : "text-paper-400 hover:bg-white/[0.03]"
              }`}
            >
              <Code size={13} /> Raw
            </button>
          </div>
          <Button variant="secondary" onClick={handleCopy} className="!px-3 !py-2 text-xs flex items-center gap-1.5">
            {copied ? <Check size={14} className="text-line-400" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="secondary" onClick={handleDownload} className="!px-3 !py-2 text-xs flex items-center gap-1.5">
            <Download size={14} /> Download
          </Button>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {mode === "preview" ? (
          <div className="markdown-preview p-6">
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        ) : (
          <pre className="p-6 font-mono text-sm text-paper-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
            {readme}
          </pre>
        )}
      </div>
    </div>
  );
}
