export type FieldType =
  | "text"
  | "email"
  | "select"
  | "number"
  | "checkbox"
  | "tel";

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
  defaultValue: any;
  visible: boolean;
  editable: boolean;
  focusable: boolean;
  useSource: boolean
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

  validation: ValidationConfig;
  accessibility: AccessibilityConfig;
}

export interface FormConfig {
  formId: string;
  formTitle: string;
  fields: FieldConfig[];
}
