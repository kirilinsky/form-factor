"use client";

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
import { Spinner } from "@/components/ui/spinner";
import { FieldConfig } from "@/lib/types/form";
import { useGetField } from "@/hooks/use-get-fields/use-get-fields";

export function SelectField({ field }: { field: FieldConfig }) {
  const { control } = useFormContext();

  const { options, isLoading } = useGetField(field);

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
                <div className="flex items-center gap-2">
                  {isLoading && (
                    <Spinner className="h-4 w-4 text-muted-foreground" />
                  )}
                  <SelectValue
                    placeholder={
                      isLoading ? "Loading data..." : field.placeholder
                    }
                  />
                </div>
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  {!isLoading &&
                    options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
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
