import { FieldConfig } from "@/lib/types/form";
import { TextField } from "../custom/text-field/text-field";
import { SelectField } from "../custom/select-field/select-field";
import { CheckboxField } from "../custom/checkbox-field/checkbox-filed";
import { TextareaField } from "../custom/textarea-field/textarea-field";
import { SwitchField } from "../custom/switch-field/switch-field";
import { GridItemWrap } from "../custom/grid-wrap/grid-wrap";
import { SearchField } from "../custom/search-field/search-field";
import { DateField } from "../custom/date-field/date-field";

interface FormFactorProps {
  field: FieldConfig;
  columns: number;
}
export const FormFactor = ({ field, columns }: FormFactorProps) => {
  if (!field.visible) return null;

  return (
    <GridItemWrap totalColumns={columns} field={field}>
      {(() => {
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
          case "search":
            return <SearchField field={field} />;
          case "date":
            return <DateField field={field} />;
          default:
            return null;
        }
      })()}
    </GridItemWrap>
  );
};
