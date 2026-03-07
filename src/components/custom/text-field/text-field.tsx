"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FieldConfig } from "@/lib/types/form";

export function TextField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhfField, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.id}>
            {field.label}
            {field.validation.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </FieldLabel>

          <Input
            {...rhfField}
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            disabled={!field.editable}
            inputMode={field.inputMode}
            aria-invalid={fieldState.invalid}
            value={rhfField.value ?? ""}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
