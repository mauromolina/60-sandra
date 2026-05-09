"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin/invites");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-cream-dark/30 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl border border-gold/15 shadow-lg shadow-gold/5 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <Lock className="h-5 w-5 text-gold" />
            </div>
            <h1 className="font-serif italic text-2xl text-charcoal">Administración</h1>
            <p className="font-sans text-xs text-warm-gray mt-1">Los 60 de Sandra</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Contraseña"
                autoFocus
                className="w-full px-4 py-3 text-sm font-sans rounded-xl border border-gold/15 bg-cream/50 text-charcoal placeholder:text-warm-gray/40 focus:outline-none focus:border-gold/40 transition-colors"
              />
              {error && (
                <p className="mt-2 text-xs font-sans text-red-500">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className="w-full py-3 rounded-xl font-sans text-sm font-medium text-white bg-gradient-to-r from-gold to-gold-muted hover:from-gold-light hover:to-gold shadow-md shadow-gold/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
