"use client";

import React, { useEffect, useState } from "react";

type LoadingState = { text: string };

interface Props {
  loadingStates: LoadingState[];
  loading: boolean;
  duration?: number; // ms per step
}

export function MultiStepLoader({ loadingStates, loading, duration = 1500 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!loading) {
      setIndex(0);
      return;
    }

    setIndex(0);
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % loadingStates.length);
    }, duration);

    return () => clearInterval(interval);
  }, [loading, duration, loadingStates.length]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 w-full max-w-md shadow-lg flex flex-col items-center gap-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H0" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-foreground">{loadingStates[index]?.text}</h3>
        <p className="text-sm text-muted-foreground">Step {index + 1} of {loadingStates.length}</p>

        <div className="flex gap-2 mt-3">
          {loadingStates.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === index ? "bg-foreground" : "bg-slate-300"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiStepLoader;
