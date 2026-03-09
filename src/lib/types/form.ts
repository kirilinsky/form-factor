export type FieldType =
  | "text"
  | "email"
  | "select"
  | "number"
  | "checkbox"
  | "tel"
  | "textarea"
  | "switch"
  | "file"
  | "search"
  | "date"
  | "radio"
  | "autosuggestion";

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

export interface FileConfig {
  multiple: boolean;
  accept: string;
  compact: boolean;
  showUploadedPreview: boolean;
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
  fileConfig?: FileConfig;
}

export interface FormConfig {
  formId: string;
  formTitle: string;
  fields: FieldConfig[];
}
