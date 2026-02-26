"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Authenticating with Google...");

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setStatus("No authorization code found.");
      setTimeout(() => router.push("/dashboard/integrations"), 3000);
      return;
    }

    const exchangeCode = async () => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/google/exchange`,
          { code },
          { withCredentials: true },
        );
        setStatus("Successfully connected Google Drive! Redirecting...");
        setTimeout(() => router.push("/dashboard/integrations"), 1500);
      } catch (error) {
        console.error("Failed to exchange code", error);
        setStatus("Failed to authenticate with Google. Please try again.");
        setTimeout(() => router.push("/dashboard/integrations"), 3000);
      }
    };

    exchangeCode();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
      <div className="space-y-4">
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        <h2 className="text-xl font-semibold tracking-tight">{status}</h2>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
