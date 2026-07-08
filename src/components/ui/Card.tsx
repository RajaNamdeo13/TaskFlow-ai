import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  corners?: boolean;
}

export function Card({ children, className = "", delay = 0, corners = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass-panel glass-panel-hover p-6 ${corners ? "blueprint-corners" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
