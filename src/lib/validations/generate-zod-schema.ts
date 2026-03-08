import { FormConfig } from "../types/form";
import { z } from "zod";

export function generateZodSchema(config: FormConfig) {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  config.fields.forEach((field) => {
    const { validation, type } = field;
    let shape: z.ZodTypeAny;

    if (type === "checkbox" || type === "switch") {
      shape = z.boolean();
      if (validation.required) {
        shape = (shape as z.ZodBoolean).refine((val) => val === true, {
          message: validation.requiredError || "You must agree to continue",
        });
      }
    } else if (type === "date" || type === "search" || type === "select") {
      shape = z.string().nullable();

      if (validation.required) {
        shape = (shape as z.ZodString).refine(
          (val) => !!val && val.length > 0,
          {
            message: validation.requiredError || "Selection is required",
          },
        );
      } else {
        shape = shape.optional().or(z.literal(""));
      }
    } else {
      let stringShape = z.string();

      if (validation.required) {
        stringShape = stringShape.min(
          1,
          validation.requiredError || "This field is required",
        );
      } else {
        stringShape = stringShape
          .nullable()
          .optional()
          .or(z.literal("")) as any;
      }

      if (validation.min !== undefined) {
        stringShape = stringShape.min(
          validation.min,
          validation.minError ||
            `Minimum ${validation.min} characters required`,
        );
      }

      if (validation.max !== undefined) {
        stringShape = stringShape.max(
          validation.max,
          validation.maxError || `Maximum ${validation.max} characters allowed`,
        );
      }

      if (validation.regex) {
        stringShape = stringShape.regex(
          new RegExp(validation.regex),
          validation.regexError || "Invalid format",
        );
      }

      shape = stringShape;
    }

    schemaObject[field.name] = shape;
  });

  return z.object(schemaObject);
}
