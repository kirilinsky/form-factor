"use client";

import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldConfig, FieldOption } from "@/lib/types/form";

export function SelectField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();
  const [options, setOptions] = useState<FieldOption[]>(field.options || []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if API source is required
    if (field.useSource && field.source.type === "api" && field.source.url) {
      const fetchOptions = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(field.source.url!);
          if (!response.ok) throw new Error("API request failed");
          const data = await response.json();

          // Map API response to standard FieldOption format
          const formattedOptions: FieldOption[] = data.map((item: any) => ({
            label: item.name || item.label || "Unknown",
            value: String(item.id || item.value || ""),
          }));

          setOptions(formattedOptions);
        } catch (error) {
          console.error("SelectField fetch error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchOptions();
    }
  }, [field.useSource, field.source]);

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhfField, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.id}>
              {field.label}
              {field.validation.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </FieldLabel>

            <Select
              onValueChange={rhfField.onChange}
              value={rhfField.value || ""}
              disabled={!field.editable || isLoading}
            >
              <SelectTrigger id={field.id} className="w-full">
                <SelectValue
                  placeholder={
                    isLoading ? "Loading data..." : field.placeholder
                  }
                />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                      <div className="animate-spin mr-3 h-4 w-4 border-b-2 border-primary rounded-full" />
                      Fetching list...
                    </div>
                  ) : (
                    options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FieldContent>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
