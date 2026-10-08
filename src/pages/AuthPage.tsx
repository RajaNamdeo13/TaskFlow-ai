import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, KeyRound, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "login") await login(email, password);
      else await register(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to authenticate.");
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setShowPassword(false);
    setError(null);
  };

  return (
    <main className="min-h-screen blueprint-grid flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-paper-500 hover:text-paper-300 mb-8"><ArrowLeft size={14} /> Back home</Link>
        <div className="glass-panel blueprint-corners p-8">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 rounded-xl bg-signal-500/15 flex items-center justify-center"><KeyRound className="text-signal-400" size={18} /></div><div><p className="font-mono text-xs text-line-400">POSTGRESQL WORKSPACE</p><h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your workspace"}</h1></div></div>
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && <label className="block"><span className="text-xs font-mono text-paper-500">NAME</span><input value={name} onChange={event => setName(event.target.value)} required minLength={2} className="mt-2 w-full input" placeholder="Your name" autoComplete="name" /></label>}
            <label className="block"><span className="text-xs font-mono text-paper-500">EMAIL</span><input type="email" value={email} onChange={event => setEmail(event.target.value)} required className="mt-2 w-full input" placeholder="you@example.com" autoComplete="email" /></label>
            <label className="block"><span className="text-xs font-mono text-paper-500">PASSWORD</span><div className="relative mt-2"><input type={showPassword ? "text" : "password"} value={password} onChange={event => setPassword(event.target.value)} required minLength={8} className="w-full input pr-11" placeholder="At least 8 characters" autoComplete={mode === "login" ? "current-password" : "new-password"} /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-paper-500 hover:text-signal-400 transition-colors">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            <Button type="submit" disabled={busy} className="w-full flex items-center justify-center gap-2">{mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}{busy ? "Working..." : mode === "login" ? "Sign in" : "Create account"}</Button>
          </form>
          <button onClick={switchMode} className="mt-6 w-full text-sm text-paper-400 hover:text-line-400">{mode === "login" ? "Need an account? Create one" : "Already have an account? Sign in"}</button>
        </div>
      </div>
    </main>
  );
}
