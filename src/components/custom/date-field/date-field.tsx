"use client";

import dayjs from "dayjs";
import { ChevronDownIcon, CalendarIcon } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FieldDescription,
} from "@/components/ui/field";
import { FieldConfig } from "@/lib/types/form";

export function DateField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-full">
          <FieldContent className="flex flex-col justify-evenly h-full">
            <FieldLabel htmlFor={field.id}>
              {field.label}
              {field.validation.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </FieldLabel>
            {field.helperText && (
              <FieldDescription>{field.helperText}</FieldDescription>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={field.id}
                  variant="outline"
                  disabled={!field.editable}
                  className={cn(
                    "w-full justify-between text-left font-normal transition-all",
                    !value && "text-muted-foreground",
                    fieldState.invalid && "border-destructive",
                  )}
                >
                  <div className="flex items-center gap-2 truncate">
                    <CalendarIcon className="h-4 w-4 opacity-50" />
                    {value ? (
                      dayjs(value).format("MMMM D, YYYY")
                    ) : (
                      <span>{field.placeholder || "Pick a date"}</span>
                    )}
                  </div>
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value ? new Date(value) : undefined}
                  onSelect={(date) =>
                    onChange(date ? date.toISOString() : null)
                  }
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </FieldContent>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
