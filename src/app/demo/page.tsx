"use client";

import { FormFactor } from "@/components/form-factor/form-factor";
import { FormWrap } from "@/components/ui/form-wrap/form-wrap";
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
    <main className="container mx-auto py-10 max-w-2xl">
      <FormWrap>
        {config &&
          config.fields.map((field) => (
            <FormFactor key={field.id} field={field} />
          ))}
      </FormWrap>
    </main>
  );
}
