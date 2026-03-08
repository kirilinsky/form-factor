export type FieldType =
  | "text"
  | "email"
  | "select"
  | "number"
  | "checkbox"
  | "tel"
  | "textarea"
  | "switch"
  | "search"
  | "date"
  | "radio";

export type DataSourceType = "static" | "api";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldSource {
  type: DataSourceType;
  url: string | null;
}

export interface FieldValidation {
  required: boolean;
  requiredError?: string;
  min?: number;
  minError?: string;
  max?: number;
  maxError?: string;
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
  helperText: string | null;
  labelOn: string | null;
  labelOff: string | null;
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
  validation: FieldValidation;
  accessibility: AccessibilityConfig;
  column: number;
  offset: "left" | "right" | null;
}

export interface FormConfig {
  formId: string;
  formTitle: string;
  fields: FieldConfig[];
}
