import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "high" | "medium" | "low" | "get" | "post" | "put" | "patch" | "delete";
}

const variantStyles: Record<string, string> = {
  default: "bg-signal-500/15 text-signal-400 border-signal-500/30",
  high: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  get: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  post: "bg-signal-500/15 text-signal-400 border-signal-500/30",
  put: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  patch: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  delete: "bg-rose-500/15 text-rose-400 border-rose-500/30",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-mono font-medium px-2.5 py-1 rounded-full border ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
