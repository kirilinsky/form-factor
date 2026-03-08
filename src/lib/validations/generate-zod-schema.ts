import { FormConfig } from "../types/form";
import { z } from "zod";

export function generateZodSchema(config: FormConfig) {
  const schemaObject: Record<string, any> = {};

  config.fields.forEach((field) => {
    let shape;
    const { validation, type } = field;

    if (type === "checkbox" || type === "switch") {
      shape = z.boolean();
    } else {
      shape = z.string();
    }

    if (validation.required) {
      if (type === "checkbox" || type === "switch") {
        const checkMsg =
          validation.requiredError || "You must agree to continue";
        shape = (shape as z.ZodBoolean).refine((val) => val === true, {
          message: checkMsg,
        });
      } else {
        const reqMsg = validation.requiredError || "This field is required";
        shape = (shape as z.ZodString).min(1, reqMsg);
      }
    } else if (type !== "checkbox" && type !== "switch") {
      shape = (shape as z.ZodString).optional().or(z.literal(""));
    }

    if (type !== "checkbox" && type !== "switch") {
      if (validation.min !== undefined) {
        const minMsg =
          validation.minError ||
          `Minimum ${validation.min} characters required`;
        shape = (shape as z.ZodString).min(validation.min, minMsg);
      }

      if (validation.max !== undefined) {
        const maxMsg =
          validation.maxError || `Maximum ${validation.max} characters allowed`;
        shape = (shape as z.ZodString).max(validation.max, maxMsg);
      }

      if (validation.regex) {
        shape = (shape as z.ZodString).regex(
          new RegExp(validation.regex),
          validation.regexError || "Invalid format",
        );
      }
    }

    schemaObject[field.name] = shape;
  });

  return z.object(schemaObject);
}
