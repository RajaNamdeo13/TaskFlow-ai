import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Analyzing requirements...",
  "Drafting system architecture...",
  "Designing API endpoints...",
  "Modeling database schema...",
  "Building the roadmap...",
  "Breaking down tasks...",
];

export function LoadingState() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1 < STEPS.length ? prev + 1 : prev));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center py-20">
      <div className="relative w-20 h-20 mx-auto mb-8">
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-signal-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 rounded-xl border-2 border-line-500/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-line-400 text-xs">
          AI
        </div>
      </div>

      <div className="space-y-2">
        {STEPS.map((step, i) => (
          <motion.p
            key={step}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: i <= stepIndex ? 1 : 0.2 }}
            className={`font-mono text-sm ${i === stepIndex ? "text-line-400" : "text-paper-500"}`}
          >
            {step}
          </motion.p>
        ))}
      </div>
    </div>
  );
}
