"use client";

import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFactor } from "../form-factor/form-factor";
import { FormConfig } from "@/lib/types/form";
import { FormWrap } from "../custom/form-wrap/form-wrap";
import { generateZodSchema } from "@/lib/validations/generate-zod-schema";
import { getInitialValues } from "@/lib/inital-values/initial-values";

interface DynamicFormProps {
  config: FormConfig;
}

export function DynamicForm({ config }: DynamicFormProps) {
  const schema = useMemo(() => generateZodSchema(config), [config]);
  const initialValues = useMemo(() => getInitialValues(config), [config]);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onTouched",
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted Successfully:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <FormWrap>
          {config.fields.map((field) => (
            <FormFactor key={field.id} field={field} />
          ))}
        </FormWrap>

        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-slate-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
