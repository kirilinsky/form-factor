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

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value, ...rhfField }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.id}>{field.label}</FieldLabel>
            {field.helperText && (
              <FieldDescription>{field.helperText}</FieldDescription>
            )}
            {field.mask ? (
              <PatternFormat
                {...rhfField}
                format={field.mask}
                mask="_"
                value={value}
                onValueChange={(values) => {
                  onChange(values.value);
                }}
                customInput={Input}
                placeholder={field.placeholder}
                disabled={!field.editable}
              />
            ) : (
              <Input
                {...rhfField}
                value={value}
                onChange={onChange}
                placeholder={field.placeholder}
                disabled={!field.editable}
                type={field.type}
              />
            )}
          </FieldContent>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
