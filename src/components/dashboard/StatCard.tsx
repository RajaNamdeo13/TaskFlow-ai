import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-signal-500/15 flex items-center justify-center">
          <Icon size={16} className="text-signal-400" />
        </div>
      </div>
      <p className="font-[family-name:var(--font-display)] text-2xl font-bold mb-1">{value}</p>
      <p className="text-xs text-paper-500 font-mono uppercase">{label}</p>
    </motion.div>
  );
}
