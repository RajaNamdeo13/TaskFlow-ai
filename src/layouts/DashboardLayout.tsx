import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen blueprint-grid-fine">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
