"use client";

import * as React from "react";
import { Loader2, MapPin, Search } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldConfig } from "@/lib/types/form";
import { cn } from "@/lib/utils";

const MOCK_RESULTS = [
  "1600 Amphitheatre Parkway, Mountain View, CA",
  "10 Downing Street, London, UK",
  "Place de la Concorde, Paris, France",
  "Tour de Eiffel, Paris, France",
];

export function AutosuggestionField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const handleInputChange = (val: string, onChange: (val: string) => void) => {
    setQuery(val);
    onChange(val);

    if (val.trim().length > 0) {
      setOpen(true);
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="rounded-md border p-4 shadow-sm h-full flex flex-col justify-between"
        >
          <FieldContent className="space-y-2 relative">
            <div>
              <FieldLabel className="text-sm font-medium">
                {field.label}
                {field.validation.required && (
                  <span className="text-destructive ml-1">*</span>
                )}
              </FieldLabel>
              {field.helperText && (
                <FieldDescription className="text-xs text-muted-foreground">
                  {field.helperText}
                </FieldDescription>
              )}
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    placeholder={field.placeholder || "Start typing address..."}
                    value={query || value || ""}
                    onChange={(e) =>
                      handleInputChange(e.target.value, onChange)
                    }
                    className={cn(
                      "pl-9",
                      fieldState.invalid && "border-destructive",
                    )}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
              </PopoverTrigger>
              {value && (
                <PopoverContent
                  className="p-0 w-[var(--radix-popover-trigger-width)] overflow-hidden"
                  align="start"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col min-h-[100px] justify-center">
                    {loading ? (
                      <div className="flex items-center justify-center gap-2 p-4 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span>Fetching suggestions...</span>
                      </div>
                    ) : (
                      <div className="py-1">
                        {MOCK_RESULTS.map((addr) => (
                          <button
                            key={addr}
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                            onClick={() => {
                              onChange(addr);
                              setQuery(addr);
                              setOpen(false);
                            }}
                          >
                            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                            <span className="truncate">{addr}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              )}
            </Popover>
          </FieldContent> 
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="mt-2" />
          )}
        </Field>
      )}
    />
  );
}
