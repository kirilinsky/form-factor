import { describe, it, expect } from "vitest";
import { getInitialValues } from "./initial-values";
import { FormConfig } from "../types/form";

describe("getInitialValues", () => {
  const mockConfig: Partial<FormConfig> = {
    fields: [
      {
        name: "projectTitle",
        defaultValue: "New Project",
      } as any,
      {
        name: "isPublic",
        defaultValue: false,
      } as any,
    ],
  };

  it("should collect default values from config", () => {
    const result = getInitialValues(mockConfig as FormConfig);

    expect(result).toEqual({
      projectTitle: "New Project",
      isPublic: false,
    });
  });

  it("should override default values with external data", () => {
    const externalData = [{ name: "projectTitle", value: "Overridden Title" }];

    const result = getInitialValues(mockConfig as FormConfig, externalData);

    expect(result).toEqual({
      projectTitle: "Overridden Title",
      isPublic: false,
    });
  });

  it("should ignore overrides for fields that do not exist in config", () => {
    const externalData = [{ name: "nonExistent", value: "Ghost" }];

    const result = getInitialValues(mockConfig as FormConfig, externalData);

    expect(result).not.toHaveProperty("nonExistent");
    expect(result).toEqual({
      projectTitle: "New Project",
      isPublic: false,
    });
  });
});
