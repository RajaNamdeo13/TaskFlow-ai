import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/dashboard/Sidebar";
import { useAuth } from "../context/AuthContext";
export function DashboardLayout() { const { user, loading } = useAuth(); const navigate = useNavigate(); useEffect(() => { if (!loading && !user) navigate("/auth", { replace: true }); }, [loading, user, navigate]); if (loading || !user) return <div className="min-h-screen flex items-center justify-center text-paper-500 font-mono text-sm">Loading workspace…</div>; return <div className="flex min-h-screen blueprint-grid-fine"><Sidebar /><div className="flex-1 min-w-0"><Outlet /></div></div>; }
