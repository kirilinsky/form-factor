"use client";

import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormConfig } from "@/lib/types/form";
import { FormWrap } from "../custom/form-wrap/form-wrap";
import { generateZodSchema } from "@/lib/validations/generate-zod-schema";
import { getInitialValues } from "@/lib/inital-values/initial-values";
import { Button } from "@/components/ui/button";
import { FormFactor } from "../form-factor/form-factor";

interface FormAssemblyProps {
  config: FormConfig;
  columns?: number;
  onSubmit: (data: any) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function FormAssembly({
  config,
  columns = 1,
  onSubmit,
  submitLabel = "Submit",
  isSubmitting = false,
}: FormAssemblyProps) {
  const schema = useMemo(() => generateZodSchema(config), [config]);
  const initialValues = useMemo(() => getInitialValues(config), [config]);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onTouched",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormWrap columns={columns}>
          {config.fields.map((field) => (
            <FormFactor columns={columns} key={field.id} field={field} />
          ))}
        </FormWrap>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            {isSubmitting ? "Processing..." : submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
