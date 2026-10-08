import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";
import { Button } from "../ui/Button";
import { EXAMPLE_PROMPTS } from "../../lib/examplePrompts";

interface IdeaInputProps {
  onGenerate: (idea: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function IdeaInput({ onGenerate, isLoading, error }: IdeaInputProps) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(idea);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <p className="font-mono text-sm text-line-400 mb-3">NEW BLUEPRINT</p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-3">
          Describe your <span className="text-gradient">software idea</span>
        </h1>
        <p className="text-paper-300">Plain English is fine. Be as specific or as rough as you like.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-2 blueprint-corners">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. A habit-tracking app where users build streaks, set reminders, and share progress with friends..."
          rows={5}
          className="w-full bg-transparent px-4 py-3 text-paper-100 placeholder:text-paper-500 outline-none resize-none"
        />
        <div className="flex items-center justify-between px-2 pb-2 pt-1">
          <span className="text-xs text-paper-500 font-mono">{idea.length} / 500</span>
          <Button type="submit" disabled={isLoading || !idea.trim()} className="flex items-center gap-2">
            <Wand2 size={16} />
            {isLoading ? "Drafting..." : "Generate Blueprint"}
          </Button>
        </div>
      </form>

      {error && (
        <p className="mt-3 text-sm text-rose-400 font-mono text-center">{error}</p>
      )}

      <div className="mt-6">
        <p className="text-xs text-paper-500 font-mono mb-3 text-center">OR TRY AN EXAMPLE</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setIdea(prompt)}
              className="text-xs px-3 py-2 rounded-lg glass-panel glass-panel-hover text-paper-300 text-left max-w-[220px]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
