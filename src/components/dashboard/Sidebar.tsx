import { NavLink } from "react-router-dom";
import { LayoutGrid, LayoutDashboard, Sparkles, FolderOpen } from "lucide-react";
import { isGeminiConfigured } from "../../services/geminiService";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/new", label: "New Blueprint", icon: Sparkles, end: false },
  { to: "/dashboard/blueprints", label: "All Blueprints", icon: FolderOpen, end: false },
];

export function Sidebar() {
  const live = isGeminiConfigured();

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-white/5 bg-ink-950/60 backdrop-blur-xl flex flex-col">
      <div className="px-5 py-6 border-b border-white/5">
        <NavLink to="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] font-semibold text-lg">
          <LayoutGrid size={20} className="text-signal-400" />
          TaskFlow <span className="text-gradient">AI</span>
        </NavLink>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-signal-500/15 text-signal-400 border border-signal-500/30"
                  : "text-paper-300 border border-transparent hover:bg-white/[0.03]"
              }`
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-5 border-t border-white/5">
        <span
          className={`font-mono text-xs px-2.5 py-1.5 rounded-full border block text-center ${
            live
              ? "text-line-400 border-line-500/30 bg-line-500/10"
              : "text-amber-400 border-amber-500/30 bg-amber-500/10"
          }`}
        >
          {live ? "● LIVE" : "● DEMO MODE"}
        </span>
      </div>
    </aside>
  );
}
