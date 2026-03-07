"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, Check } from "lucide-react";
import codeJSON from "@/mocks/default.json";

export default function PreviewPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (codeJSON) {
      navigator.clipboard.writeText(JSON.stringify(codeJSON, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-4 flex justify-center items-start">
      <div className="w-full max-w-4xl flex flex-col gap-y-8">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <Link
              href="/"
              className="group flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Assembly
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter uppercase">
              Config Example
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy JSON"}
          </Button>
        </header>

        <Card className="border-border   ">
          <CardContent className="p-0">
            <Highlight
              theme={themes.vsDark}
              code={JSON.stringify(codeJSON, null, 2)}
              language="json"
            >
              {({ className, style, tokens, getTokenProps }) => (
                <pre
                  className="p-6 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed"
                  style={style}
                >
                  {tokens.map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pr-4 text-slate-600 text-right select-none w-10">
                        {i + 1}
                      </span>
                      <span className="table-cell">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </CardContent>
        </Card>
        <div className="flex justify-center italic text-xs text-muted-foreground">
          This JSON drives the entire Form Factor instance rendering engine.
        </div>
      </div>
    </main>
  );
}
