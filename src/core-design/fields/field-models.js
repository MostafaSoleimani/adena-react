import DesignerCheckbox from "./Checkbox";
import DesignerTextField from "./TextField";
import DesignerNumberField from "./NumberField";
import DesignerDropDown from "./Dropdown";

const FIELDS_MODELS = (config) => {
    const model = {
        Checkbox: <DesignerCheckbox config={config}/>,
        Text: <DesignerTextField config={config}/>,
        Number: <DesignerNumberField config={config}/>,
        Dropdown: <DesignerDropDown config={config}/>,
    }
    return model[config.data.type]
};

export default FIELDS_MODELS;
