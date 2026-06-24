import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Lock, LogOut } from "lucide-react";

const STORAGE_KEY = "linearproperty:admin:auth";
const SESSION_VALUE = "ok";

// Kredensial default. Ubah di sini untuk mengganti username/password admin.
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "linear2025";

export function AdminGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(STORAGE_KEY) === SESSION_VALUE);
    } catch {
      /* ignore */
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  };

  if (authed) {
    return (
      <div>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" /> Keluar
          </button>
        </div>
        {children}
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, SESSION_VALUE);
      } catch {
        /* ignore */
      }
      setAuthed(true);
      setError("");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <main className="min-h-[70vh] grid place-items-center px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 text-accent mb-2">
          <Lock className="h-4 w-4" />
          <span className="text-xs uppercase tracking-[0.2em]">Panel Admin</span>
        </div>
        <h1 className="font-display text-2xl mb-1">Masuk untuk mengelola</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Hanya admin yang dapat mengubah daftar properti.
        </p>

        <label className="block mb-3">
          <span className="text-xs font-medium text-muted-foreground block mb-1.5">Username</span>
          <input
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="admin"
          />
        </label>
        <label className="block mb-4">
          <span className="text-xs font-medium text-muted-foreground block mb-1.5">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm outline-none focus:border-accent"
            placeholder="••••••••"
          />
        </label>

        {error && <p className="text-xs text-destructive mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          Masuk
        </button>

        <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
          Catatan: kredensial default adalah <code>admin</code> / <code>linear2025</code>.
          Ubah di file <code>src/components/AdminGate.tsx</code> agar lebih aman.
        </p>
      </form>
    </main>
  );
}
