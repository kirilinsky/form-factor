"use client";

import { useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormConfig } from "@/lib/types/form";
import { FormWrap } from "../custom/form-wrap/form-wrap";
import { generateZodSchema } from "@/lib/validations/generate-zod-schema";
import { getInitialValues } from "@/lib/inital-values/initial-values";
import { FormFactor } from "../form-factor/form-factor";

interface FormAssemblyProps {
  config: FormConfig;
  columns?: number;
  onSubmit: (data: any) => void;
  formId: string;
}

export function FormAssembly({
  config,
  columns = 1,
  onSubmit,
  formId,
}: FormAssemblyProps) {
  const schema = useMemo(() => generateZodSchema(config), [config]);
  const initialValues = useMemo(() => getInitialValues(config), [config]);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onTouched",
    shouldFocusError: true,
  });

  useEffect(() => {
    methods.reset(initialValues);
  }, [initialValues, methods]);

  return (
    <FormProvider {...methods}>
      <form
        id={formId}
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full"
      >
        <FormWrap columns={columns}>
          {config.fields.map((field) => (
            <FormFactor columns={columns} key={field.id} field={field} />
          ))}
        </FormWrap>
      </form>
    </FormProvider>
  );
}
