import { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  FileCode2,
  Database,
  ShieldCheck,
  GitBranch,
  Rocket,
  ListChecks,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import type { ProjectBlueprint, BlueprintTabId } from "../../types/blueprint.types";
import { ArchitectureView } from "./ArchitectureView";
import { ApiDesignView } from "./ApiDesignView";
import { SchemaView } from "./SchemaView";
import { AuthStrategyView } from "./AuthStrategyView";
import { RoadmapView } from "./RoadmapView";
import { SprintPlanView } from "./SprintPlanView";
import { TaskBreakdownView } from "./TaskBreakdownView";
import { FutureScopeView } from "./FutureScopeView";
import { ReadmeView } from "./ReadmeView";

interface BlueprintTabsProps {
  blueprint: ProjectBlueprint;
}

const TABS: { id: BlueprintTabId; label: string; icon: typeof Layers }[] = [
  { id: "architecture", label: "Architecture", icon: Layers },
  { id: "api", label: "API Design", icon: FileCode2 },
  { id: "schema", label: "Database", icon: Database },
  { id: "auth", label: "Auth Strategy", icon: ShieldCheck },
  { id: "roadmap", label: "Roadmap", icon: GitBranch },
  { id: "sprints", label: "Sprints", icon: Rocket },
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "future", label: "Future Scope", icon: TrendingUp },
  { id: "readme", label: "README", icon: BookOpen },
];

export function BlueprintTabs({ blueprint }: BlueprintTabsProps) {
  const [activeTab, setActiveTab] = useState<BlueprintTabId>("architecture");

  return (
    <div>
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                isActive
                  ? "bg-signal-500/15 text-signal-400 border border-signal-500/40"
                  : "text-paper-300 border border-transparent hover:bg-white/[0.03]"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        {activeTab === "architecture" && (
          <ArchitectureView
            architecture={blueprint.architecture}
            techStack={blueprint.techStack}
            folderStructure={blueprint.folderStructure}
          />
        )}
        {activeTab === "api" && <ApiDesignView endpoints={blueprint.apiDesign} />}
        {activeTab === "schema" && <SchemaView tables={blueprint.databaseSchema} />}
        {activeTab === "auth" && <AuthStrategyView auth={blueprint.authStrategy} />}
        {activeTab === "roadmap" && <RoadmapView roadmap={blueprint.roadmap} />}
        {activeTab === "sprints" && <SprintPlanView sprints={blueprint.sprints} />}
        {activeTab === "tasks" && <TaskBreakdownView tasks={blueprint.tasks} />}
        {activeTab === "future" && <FutureScopeView items={blueprint.futureScope} />}
        {activeTab === "readme" && <ReadmeView readme={blueprint.readme} projectName={blueprint.projectName} />}
      </motion.div>
    </div>
  );
}
