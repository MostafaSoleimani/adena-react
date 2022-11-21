import CheckboxConfig from "./CheckboxConfig";
import ContainerConfig from "./ContainerConfig";
import DropdownConfig from "./DropdownConfig";
import NumberConfig from "./NumberConfig";
import TextConfig from "./TextConfig";

const DESIGN_FIELD_CONFIGS = (config, save) => {
    const model = {
        Text: <TextConfig config={config} save={save}/>,
        Number: <NumberConfig config={config} save={save}/>,
        Dropdown: <DropdownConfig config={config} save={save}/>,
        Checkbox: <CheckboxConfig config={config} save={save}/>,
        Container: <ContainerConfig config={config} save={save}/>,
    }
    return model[config.data.type]
};



export default DESIGN_FIELD_CONFIGS;
