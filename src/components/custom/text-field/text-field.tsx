"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FieldConfig } from "@/lib/types/form";

export function TextField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  const descriptionId = `${field.id}-description`;
  const errorId = `${field.id}-error`;

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value, ...rhfField }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-full">
          <FieldContent className="flex flex-col justify-evenly h-full">
            <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>

            {field.helperText && (
              <FieldDescription id={descriptionId}>
                {field.helperText}
              </FieldDescription>
            )}

            {field.mask ? (
              <PatternFormat
                {...rhfField}
                id={field.id}
                format={field.mask}
                mask="_"
                value={value}
                onValueChange={(values) => onChange(values.value)}
                customInput={Input}
                placeholder={field.placeholder}
                disabled={!field.editable}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid
                    ? `${descriptionId} ${errorId}`
                    : descriptionId
                }
              />
            ) : (
              <Input
                {...rhfField}
                id={field.id}
                value={value ?? ""}
                onChange={onChange}
                placeholder={field.placeholder}
                disabled={!field.editable}
                type={field.type}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid
                    ? `${descriptionId} ${errorId}`
                    : descriptionId
                }
              />
            )}
          </FieldContent>

          {fieldState.invalid && (
            <FieldError id={errorId} errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
