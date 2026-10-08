import { motion } from "framer-motion";
import { Layers, Database, GitBranch, FileCode2, ListChecks, BookOpen } from "lucide-react";

const features = [
  { icon: Layers, label: "01", title: "Software Architecture", desc: "Layered architecture with clear separation of concerns, tailored to your idea." },
  { icon: FileCode2, label: "02", title: "API Design", desc: "Full REST endpoint specs with request/response shapes and auth requirements." },
  { icon: Database, label: "03", title: "Database Schema", desc: "Normalized tables, fields, constraints, and relationships — ready to migrate." },
  { icon: GitBranch, label: "04", title: "Development Roadmap", desc: "Phased delivery plan with realistic timelines from MVP to launch." },
  { icon: ListChecks, label: "05", title: "Task Breakdown", desc: "Granular, estimable engineering tasks tagged by priority and phase." },
  { icon: BookOpen, label: "06", title: "README Generation", desc: "A polished, recruiter-ready README generated automatically." },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative blueprint-grid-fine">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-line-400 mb-3">THE OUTPUT SET</p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-4">
            One idea. <span className="text-gradient">Six deliverables.</span>
          </h2>
          <p className="text-paper-300 max-w-xl mx-auto">
            Everything a founding engineer needs to start building — drafted in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-panel glass-panel-hover p-6 blueprint-corners"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-signal-500/15 flex items-center justify-center">
                  <f.icon size={20} className="text-signal-400" />
                </div>
                <span className="font-mono text-xs text-paper-500">{f.label}</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-paper-300 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
