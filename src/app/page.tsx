"use client";

import { useEffect, useState } from "react";
import { FormAssembly } from "@/components/form-assembly/form-assembly";
import { FormConfig } from "@/lib/types/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ThemeSwitch } from "@/components/theme-switch/theme-switch";
import Link from "next/link";

export default function Home() {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const FORM_ID = "form-factor-assembly";

  const handleMySubmit = (data: any) => {
    console.log("Form Factor Output:", data);
  };

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch("/api/get-form");
        if (!response.ok) throw new Error("Form Factor Configuration failed");
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground font-medium italic">
          Initializing Form Factor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="border-destructive/50 bg-destructive/5 max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">System Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4 flex justify-center items-start transition-colors duration-300">
      <div className="w-full max-w-3xl flex flex-col gap-y-8">
        <header className="flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground uppercase">
              Form Factor
            </h1>
            <p className="text-muted-foreground font-medium">
              Engineered interface assembly.
            </p>
          </div>

          <div className="flex items-center gap-x-3">
            <Button
              variant="outline"
              asChild
              className="rounded-full px-5 font-semibold transition-all hover:bg-muted"
            >
              <Link href="/about">About</Link>
            </Button>

            <ThemeSwitch />
          </div>
        </header>

        {config && (
          <Card className="shadow-xl border-border bg-card">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle>Assembly Parameters</CardTitle>
              <CardDescription>
                Adjust the schema properties for the current instance.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
              <FormAssembly
                formId={FORM_ID}
                config={config}
                columns={2}
                onSubmit={handleMySubmit}
              />
            </CardContent>

            <CardFooter className="flex justify-between border-t bg-muted/30 pt-6">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="hover:bg-background"
              >
                Reset Instance
              </Button>

              <Button
                type="submit"
                form={FORM_ID}
                className="px-10 font-bold shadow-lg active:scale-95 transition-all"
              >
                Apply
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
