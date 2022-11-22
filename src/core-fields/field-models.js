import DesignerCheckbox, { CheckboxConfig } from "./Checkbox";
import DesignerDropDown, {DropdownConfig} from "./Dropdown";
import DesignerNumberField, { NumberConfig } from "./NumberField";
import DesignerTextField, { TextConfig } from "./TextField";

const FIELDS_MODELS = (config) => {
  const model = {
    Checkbox: <DesignerCheckbox config={config} />,
    Text: <DesignerTextField config={config} />,
    Number: <DesignerNumberField config={config} />,
    Dropdown: <DesignerDropDown config={config} />,
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
