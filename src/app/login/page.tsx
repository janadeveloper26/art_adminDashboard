"use client";

import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { apiFetch } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }
    setLoading(true);
    try {
      const json = await apiFetch("/auth/admin-login", {
        method: "POST",
        body: JSON.stringify({ username: email, password }),
      });

      const payload = json.data || json;
      if (payload.access) {
        localStorage.setItem("access_token", payload.access);
        if (payload.refresh) {
          localStorage.setItem("refresh_token", payload.refresh);
        }
      } else if (payload.token) {
        localStorage.setItem("access_token", payload.token);
      }

      // We also store admin_token since apiFetch looks for admin_token
      if (payload.access || payload.token) {
         localStorage.setItem("admin_token", payload.access || payload.token);
      }

      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background transition-colors relative overflow-hidden">
      {/* Decorative background blobs for Midnight & Gold feel */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md p-10 bg-card/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-3xl relative z-10 animate-fadeIn">
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary/80 flex items-center justify-center text-primary-foreground font-bold text-3xl mb-6 shadow-lg shadow-primary/30">
            A
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to continue to Art Admin
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground/90 block">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="bg-background/50 border-border focus:border-primary h-12 px-4 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground/90 block">
                Password
              </label>
              <Link
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-background/50 border-border focus:border-primary h-12 px-4 rounded-xl"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive font-medium p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              {error}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          New to Art Admin?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
