import DesignerCheckbox, { CheckboxConfig } from "./Checkbox";
import DesignerDropDown, { DropdownConfig } from "./Dropdown";
import DesignerNumberField, { NumberConfig } from "./NumberField";
import DesignerTextField, { TextConfig } from "./TextField";

const FIELDS_MODELS = (config, onChange) => {
  const model = {
    Checkbox: <DesignerCheckbox config={config} onChange={onChange} />,
    Text: <DesignerTextField config={config} onChange={onChange} />,
    Number: <DesignerNumberField config={config} onChange={onChange} />,
    Dropdown: <DesignerDropDown config={config} onChange={onChange} />,
  };
  return model[config.data.type];
};

export const FIELDS_DATA_MODELS = {
  Checkbox: CheckboxConfig,
  Text: TextConfig,
  Number: NumberConfig,
  Dropdown: DropdownConfig,
};

export default FIELDS_MODELS;
