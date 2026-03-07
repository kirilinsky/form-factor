"use client";

import { DynamicForm } from "@/components/dynamic-form/dynamic-form";
import { FormFactor } from "@/components/form-factor/form-factor";
import { FormConfig } from "@/lib/types/form";
import { useEffect, useState } from "react";

export default function Home() {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch("/api/get-form");
        if (!response.ok) throw new Error("Failed to fetch form configuration");

        const data = await response.json();
        setConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    loadConfig();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4">Loading form configuration...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-destructive">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl flex flex-col gap-y-8">
        {/* Заголовок теперь отделен через gap-y-8 от формы */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 block">
            Research Project Registration
          </h1>
          <p className="text-slate-500 mt-2">
            Please fill in the details below.
          </p>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          {config && <DynamicForm config={config} />}
        </section>
      </div>
    </main>
  );
}
