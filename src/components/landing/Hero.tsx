import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden blueprint-grid">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-signal-600/15 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-line-500/10 rounded-full blur-[120px]" />

      {/* Corner drafting marks - signature element */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-line-500/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-line-500/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-line-500/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-line-500/40" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 mb-8 text-sm text-paper-300 font-mono"
        >
        
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]"
        >
          Turn Ideas Into <span className="text-gradient">Architecture</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-paper-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Describe your software idea in plain English. TaskFlow AI drafts the architecture,
          API design, database schema, roadmap, and task breakdown — like a senior engineer
          sketching on a whiteboard, instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link to="/dashboard" className="btn-primary flex items-center gap-2">
            Start Building <ArrowRight size={18} />
          </Link>
          <a href="#features" className="btn-secondary">
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  );
}
