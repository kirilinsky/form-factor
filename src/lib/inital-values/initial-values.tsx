import { FormConfig } from "../types/form";

export function getInitialValues(
  config: FormConfig,
  overrides: { name: string; value: any }[] = [],
) {
  const baseValues = config.fields.reduce(
    (acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    },
    {} as Record<string, any>,
  );

  overrides.forEach((item) => {
    if (item.name in baseValues) {
      baseValues[item.name] = item.value;
    }
  });

  return baseValues;
}
