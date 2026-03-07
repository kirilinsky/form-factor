"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers, ShieldCheck, Zap, LayoutGrid } from "lucide-react";

const CORE_LIBRARIES = [
  {
    name: "React Hook Form",
    description:
      "The neural network of our assembly. Manages state, validation, and performance without unnecessary re-renders.",
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
  },
  {
    name: "Zod",
    description:
      "The strict supervisor. Generates schema-based validation on the fly from raw API configurations.",
    icon: <ShieldCheck className="h-6 w-6 text-blue-500" />,
  },
  {
    name: "Tailwind CSS",
    description:
      "The structural DNA. Handles our grid systems, subgrids, and the responsive Form Factor layout.",
    icon: <LayoutGrid className="h-6 w-6 text-sky-400" />,
  },
  {
    name: "Shadcn UI",
    description:
      "The building blocks. High-quality, accessible primitives that form the visual part of each Factor.",
    icon: <Layers className="h-6 w-6 text-indigo-500" />,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-16 px-4 flex justify-center items-start">
      <div className="w-full max-w-3xl flex flex-col gap-y-12">
        <header className="flex justify-between items-end border-b pb-6">
          <div className="space-y-1">
            <Link
              href="/"
              className="group flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Assembly
            </Link>
            <h1 className="text-4xl font-black tracking-tighter uppercase">
              Inside the Factor
            </h1>
          </div>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-foreground/80">
            Core Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_LIBRARIES.map((lib) => (
              <Card
                key={lib.name}
                className="bg-card/50 backdrop-blur-sm border-border hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-2 bg-background rounded-lg border shadow-sm">
                    {lib.icon}
                  </div>
                  <CardTitle className="text-lg">{lib.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lib.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-muted/30 border-dashed border-2 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">
              Form on Fly Philosophy
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-medium leading-snug">
            Form Factor isn't just a form; it's a{" "}
            <span className="text-foreground">synthesized environment</span>{" "}
            where every field knows its place, its rules, and its purpose,
            purely driven by metadata.
          </CardContent>
        </Card>

        <footer className="flex flex-col items-center gap-y-6 pt-6 border-t border-border/50">
          <Button
            variant="secondary"
            asChild
            className="group rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all px-8 shadow-lg"
          >
            <a
              href="https://github.com/kirilinsky/form-factor"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-3"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-5 w-5 fill-current transition-transform group-hover:scale-110"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span className="font-bold tracking-tight text-sm">
                Access Source Code
              </span>
            </a>
          </Button>

          <p className="text-[10px] text-muted-foreground/60 font-mono">
            © 2026 FORM FACTOR ASSEMBLY
          </p>
        </footer>
      </div>
    </main>
  );
}
