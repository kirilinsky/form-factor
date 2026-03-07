"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldConfig } from "@/lib/types/form";

export function CheckboxField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhfField, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"
        >
          <div className="flex items-center h-5">
            <Checkbox
              id={field.id}
              checked={rhfField.value}
              onCheckedChange={rhfField.onChange}
              disabled={!field.editable}
            />
          </div>

          <div className="space-y-1 leading-none">
            <FieldLabel htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.validation.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </FieldLabel>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        </Field>
      )}
    />
  );
}
