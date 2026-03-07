"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FieldConfig } from "@/lib/types/form";

export function TextareaField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

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

            <Textarea
              {...rhfField}
              id={field.id}
              placeholder={field.placeholder}
              disabled={!field.editable}
              rows={5}
              className="resize-none"
              aria-label={field.accessibility.ariaLabel}
            />
          </FieldContent>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
