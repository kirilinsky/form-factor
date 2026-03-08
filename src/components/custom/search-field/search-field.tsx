"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { FieldConfig } from "@/lib/types/form";
import { useGetField } from "@/hooks/use-get-fields/use-get-fields";

export function SearchField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();
  const { options, isLoading } = useGetField(field);
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between font-normal hover:bg-background",
                    !value && "text-muted-foreground",
                  )}
                  disabled={isLoading || !field.editable}
                >
                  <div className="flex items-center gap-2 truncate">
                    {isLoading && <Spinner className="h-4 w-4" />}
                    {value
                      ? options.find((opt) => opt.value === value)?.label
                      : field.placeholder || "Select option..."}
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
              >
                <Command>
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          onSelect={() => {
                            onChange(opt.value);
                            setOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between cursor-pointer",
                            value === opt.value && "bg-accent/50",
                          )}
                        >
                          <span className="w-full truncate">{opt.label}</span>
                          <Check
                            className={cn(
                              "ml-2 h-4 w-4 shrink-0 transition-opacity",
                              value === opt.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FieldContent>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
