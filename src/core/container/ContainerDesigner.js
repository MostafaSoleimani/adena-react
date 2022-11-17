import React from "react";
import { useDispatch } from "react-redux";
import { designerActions } from "../../store/designer-slice";
import DesignerCheckbox from "../fields/Checkbox";
import DesignerDropDown from "../fields/Dropdown";
import DesignerNumberField from "../fields/NumberField";
import DesignerTextField from "../fields/TextField";
import FieldNav from "../tools/FieldNav";
import "./ContainerDesigner.css";

const FIELDS_MODELS = {
  Checkbox: <DesignerCheckbox />,
  Text: <DesignerTextField />,
  Number: <DesignerNumberField />,
  Dropdown: <DesignerDropDown />,
};

export default function AdenaContainerDesigner({ config }) {
  const dispatch = useDispatch();
  const addField = (value) => {
    dispatch(designerActions.addField(value));
  };

  const removeField = (field) => {
    dispatch(designerActions.removeField({id: config.id, field}))
  };
  const removeContainer = () => {
    dispatch(designerActions.removeContainer(config.id));
  };

  const renderedFields = config.data.children.map((x, i) => (
    <div key={i} className="adena-designer-fields">
    <FieldNav remove={() => removeField(x)} config={x} />
      {FIELDS_MODELS[x.data.type]}
    </div>
  ));
  return (
    <div className="designer-container">
      <FieldNav add={addField} remove={removeContainer} config={config} />

      <div className="adena-tab-designer-main">
        <div className="adena-tab-designer-fields">{renderedFields}</div>
      </div>
    </div>
  );
}
