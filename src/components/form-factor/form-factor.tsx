import { FieldConfig } from "@/lib/types/form";
import { TextField } from "../custom/text-field/text-field";
import { SelectField } from "../custom/select-field/select-field";
import { CheckboxField } from "../custom/checkbox-field/checkbox-filed";
import { TextareaField } from "../custom/textarea-field/textarea-field";
import { SwitchField } from "../custom/switch-field/switch-field";

interface FormFactorProps {
  field: FieldConfig;
}

export const FormFactor = ({ field }: FormFactorProps) => {
  if (!field.visible) return null;

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "tel":
      return <TextField field={field} />;
    case "switch":
      return <SwitchField field={field} />;
    case "select":
      return <SelectField field={field} />;
    case "checkbox":
      return <CheckboxField field={field} />;
    case "textarea":
      return <TextareaField field={field} />;
    default:
      return null;
  }
};
