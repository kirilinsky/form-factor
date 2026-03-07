export type FieldType =
  | "text"
  | "email"
  | "select"
  | "number"
  | "checkbox"
  | "tel"
  | "textarea";

export type DataSourceType = "static" | "api";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldSource {
  type: DataSourceType;
  url: string | null;
}

export interface ValidationConfig {
  required: boolean;
  min?: number;
  max?: number;
  regex?: string;
  regexError?: string;
}

export interface AccessibilityConfig {
  ariaLabel: string;
}

export interface FieldConfig {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder: string;
  defaultValue: string | null;
  visible: boolean;
  editable: boolean;
  useSource: boolean;
  inputMode:
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  options: FieldOption[];
  source: FieldSource;
  mask: string | null;
  validation: ValidationConfig;
  accessibility: AccessibilityConfig;
}

export interface FormConfig {
  formId: string;
  formTitle: string;
  fields: FieldConfig[];
}
