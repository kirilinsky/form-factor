"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { FieldConfig } from "@/lib/types/form";

export function RadioField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className="rounded-md border p-4 shadow-sm h-full flex flex-col justify-between"
        >
          <FieldContent className="space-y-3">
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

            <RadioGroup
              value={value}
              onValueChange={onChange}
              disabled={!field.editable}
              className="flex flex-col gap-2"
            >
              {field.options?.map((option) => {
                const optionId = `${field.id}-${option.value}`;
                return (
                  <div key={option.value} className="flex items-center gap-3">
                    <RadioGroupItem value={option.value} id={optionId} />
                    <Label
                      htmlFor={optionId}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FieldContent>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="mt-2" />
          )}
        </Field>
      )}
    />
  );
}
