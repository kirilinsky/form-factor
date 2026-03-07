import { FormConfig } from "../types/form";
import { z } from "zod";

export function generateZodSchema(config: FormConfig) {
  const schemaObject: Record<string, any> = {};

  config.fields.forEach((field) => {
    let shape;

    if (field.type === "checkbox" || field.type === "switch") {
      shape = z.boolean();
    } else {
      shape = z.string();
    }

    if (field.validation.required) {
      if (field.type === "checkbox") {
        shape = (shape as z.ZodBoolean).refine((val) => val === true, {
          message: "You must agree to continue",
        });
      } else {
        shape = (shape as z.ZodString).min(1, "This field is required");
      }
    }

    if (field.validation.min && field.type !== "checkbox") {
      shape = (shape as z.ZodString).min(
        field.validation.min,
        `Minimum ${field.validation.min} characters required`,
      );
    }

    if (field.validation.regex && field.type !== "checkbox") {
      shape = (shape as z.ZodString).regex(
        new RegExp(field.validation.regex),
        field.validation.regexError || "Invalid format",
      );
    }

    schemaObject[field.name] = shape;
  });

  return z.object(schemaObject);
}
