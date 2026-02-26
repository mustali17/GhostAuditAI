"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ghost, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password },
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login not implemented yet.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 grid w-full max-w-5xl gap-10 rounded-3xl border bg-card/90 p-6 shadow-2xl backdrop-blur-md md:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] md:p-10">
        {/* Left: Form */}
        <div className="flex flex-col justify-center">
          <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="space-y-3 p-0">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Ghost className="h-6 w-6" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    GhostAuditAI
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Secure sign-in to your audit workspace
                  </p>
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Welcome back
                </CardTitle>
                <CardDescription className="mt-1 text-sm text-muted-foreground">
                  Log in to run new audits, review reports, and manage your
                  team.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="mt-4 space-y-6 p-0">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Work email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/60"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm">
                      Password
                    </Label>
                    <Link
                      href="#"
                      className="text-xs font-medium text-primary hover:text-primary/80"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-background/60 pr-10"
                    />
                    <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    By continuing, you confirm you&apos;re authorized to access
                    this workspace.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing you in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  <span className="px-3">or continue with</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <Button
                  variant="outline"
                  className="mt-3 w-full text-foreground hover:bg-muted"
                  onClick={handleGoogleLogin}
                  type="button"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </CardContent>

            <CardFooter className="mt-4 flex justify-center p-0">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Right: Highlight panel */}
        <div className="hidden flex-col justify-between rounded-2xl border bg-gradient-to-b from-primary/10 via-background/40 to-background/80 p-6 md:flex">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Why GhostAuditAI
            </p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">
              Real-time insights into AI-generated content.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              See how your documents perform across multiple detectors, get
              sentence-level flags, and apply our humanizer before you ever hit
              submit.
            </p>
          </div>

          <div className="mt-6 space-y-3 rounded-xl border border-primary/20 bg-background/60 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Average authenticity score
              </span>
              <span className="text-sm font-semibold text-foreground">88%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-emerald-400 to-primary" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div>
                <p className="text-[11px] text-muted-foreground">Teams</p>
                <p className="text-sm font-semibold text-foreground">1,200+</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">
                  Docs / month
                </p>
                <p className="text-sm font-semibold text-foreground">50k+</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground">
                  Flag reduction
                </p>
                <p className="text-sm font-semibold text-foreground">-73%</p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] text-muted-foreground">
            “GhostAuditAI is the safety net between our writers and
            institutional detectors.”
          </p>
        </div>
      </div>
    </div>
  );
}
