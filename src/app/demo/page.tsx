"use client";

import { FormAssembly } from "@/components/form-assembly/form-assembly";
import { FormConfig } from "@/lib/types/form";
import { useEffect, useState } from "react";

export default function Home() {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleMySubmit = (data: any) => {
    console.log(data, "<-- Formdata on submit");
  };

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
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 block">
            Form based on configuration from API
          </h1>
          <p className="text-slate-500 mt-2">You can check the network tab</p>
        </div>

        {config && (
          <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <FormAssembly
              config={config}
              columns={2}
              onSubmit={handleMySubmit}
              submitLabel="Submit button"
            />
          </section>
        )}
      </div>
    </main>
  );
}
