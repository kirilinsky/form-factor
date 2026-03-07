"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldConfig } from "@/lib/types";

interface FormInputProps {
  field: FieldConfig;
}

export const FormInput = ({ field }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: rhfField }) => (
        <FormItem className="flex flex-col gap-1.5">
          {/* Label + Accessibility */}
          <FormLabel 
            className="font-semibold"
            aria-label={field.accessibility.ariaLabel}
          >
            {field.label}
            {field.validation.required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>

          <FormControl>
            <Input
              {...rhfField}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              disabled={!field.editable}
              inputMode={field.inputMode}
              // A11y & Security
              aria-required={field.validation.required}
              aria-invalid={!!control._formState.errors[field.name]}
              autoComplete={field.type === 'email' ? 'email' : 'off'}
              tabIndex={field.focusable ? 0 : -1}
              // GDPR: предотвращаем автозаполнение чувствительных данных, если нужно
              data-lpignore="true" 
              className="focus-visible:ring-2"
            />
          </FormControl>

          {/* Описание поля под инпутом */}
          {field.description && (
            <FormDescription id={`${field.id}-description`}>
              {field.description}
            </FormDescription>
          )}

          {/* Ошибки валидации Zod прилетят сюда автоматически */}
          <FormMessage className="text-xs font-medium text-destructive" />
        </FormItem>
      )}
    />
  );
};