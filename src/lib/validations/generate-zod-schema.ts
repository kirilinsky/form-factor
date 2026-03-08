import { z } from "zod";
import { FormConfig, FieldConfig, FieldValidation } from "../types/form";

const buildBooleanSchema = (validation: FieldValidation) => {
  const base = z.boolean();
  if (validation.required) {
    return base.refine((val) => val === true, {
      message: validation.requiredError || "Required",
    });
  }
  return base;
};

const buildSelectionSchema = (field: FieldConfig) => {
  const { validation } = field;
  const base = z.union([z.string(), z.boolean(), z.number()]).nullable();

  if (validation.required) {
    return base.refine(
      (val) => val !== null && val !== undefined && val !== "",
      {
        message: validation.requiredError || "Selection is required",
      },
    );
  }
  return base.optional().or(z.literal(""));
};

const buildStringSchema = (field: FieldConfig) => {
  const { validation } = field;
  let s = z.string();

  if (validation.min !== undefined) {
    s = s.min(validation.min, validation.minError);
  }
  if (validation.max !== undefined) {
    s = s.max(validation.max, validation.maxError);
  }
  if (validation.regex) {
    s = s.regex(new RegExp(validation.regex), validation.regexError);
  }

  const finalSchema = validation.required
    ? s.min(1, validation.requiredError || "Required")
    : s.nullable().optional().or(z.literal(""));

  return z.preprocess((val) => (val === null ? "" : val), finalSchema);
};

export function generateZodSchema(config: FormConfig) {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  config.fields.forEach((field) => {
    switch (field.type) {
      case "checkbox":
      case "switch":
        schemaObject[field.name] = buildBooleanSchema(field.validation);
        break;
      case "date":
      case "radio":
      case "select":
      case "search":
        schemaObject[field.name] = buildSelectionSchema(field);
        break;
      default:
        schemaObject[field.name] = buildStringSchema(field);
        break;
    }
  });

  return z.object(schemaObject);
}
