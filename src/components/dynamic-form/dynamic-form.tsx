"use client";

import { useForm, FormProvider } from "react-hook-form";
import { FormFactor } from "../form-factor/form-factor";
import { FormConfig } from "@/lib/types/form";
import { getInitialValues } from "@/lib/inital-values/initial-values";
import { FormWrap } from "../custom/form-wrap/form-wrap";

interface DynamicFormProps {
  config: FormConfig;
}

export function DynamicForm({ config }: DynamicFormProps) {
  const initialValues = getInitialValues(config);

  const methods = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = (data: any) => console.log("Success:", data);

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
          className="px-4 py-2 bg-black text-white rounded-md"
        >
          submit
        </button>
      </form>
    </FormProvider>
  );
}
