"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  useEffect(() => {
    // small delay so the spinner can render briefly before navigation
    const t = setTimeout(() => {
      if (typeof window !== "undefined") window.location.href = "/api/auth/start";
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white px-6 overflow-hidden">
      <div className="flex flex-col items-center w-full max-w-md translate-y-[-10%]">
        <div className="flex items-center justify-center mb-6">
          <Image src="/logo-red.svg" alt="Hack Club Logo" width={80} height={80} />
        </div>

        <Spinner className="h-10 w-10 text-slate-700 mb-4" />

        <h1 className="text-lg font-semibold text-black">Loading…</h1>
        <p className="text-sm text-slate-600 mt-2">Redirecting to Hack Club Auth…</p>
      </div>
    </div>
  );
}