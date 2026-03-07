"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FieldConfig } from "@/lib/types/form";

export function SwitchField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { value, onChange, ...rhfField }, fieldState }) => {
        const currentLabel = value
          ? field.labelOn || field.label
          : field.labelOff || field.label;

        return (
          <Field
            orientation="horizontal"
            data-invalid={fieldState.invalid}
            className="justify-between border p-4 rounded-lg"
          >
            <FieldContent>
              <FieldLabel htmlFor={field.id}>{currentLabel}</FieldLabel>
              {field.helperText && (
                <FieldDescription>{field.helperText}</FieldDescription>
              )}
            </FieldContent>

            <Switch
              {...rhfField}
              id={field.id}
              checked={value}
              onCheckedChange={onChange}
              disabled={!field.editable}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
