import React from "react";
import "./ContainerDesigner.css";
import DesignerCheckbox from "../fields/Checkbox";
import DesignerDropDown from "../fields/Dropdown";
import DesignerNumberField from "../fields/NumberField";
import DesignerTextField from "../fields/TextField";
import ChooseFieldDialog from "../tools/ChooseFieldDialog";

const FIELDS_MODELS = {
  Checkbox: <DesignerCheckbox />,
  Text: <DesignerTextField />,
  Number: <DesignerNumberField />,
  Dropdown: <DesignerDropDown />,
};

export default function AdenaContainerDesigner() {
  const [fields, setFields] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setFields((pre) => [...pre, value]);
  };

  const renderedFields = fields.map((x, i) => (
    <div key={i} className="adena-designer-fields">
      {FIELDS_MODELS[x]}
    </div>
  ));
  return (
    <>
      <div className="designer-container">
        <button onClick={handleClickOpen}>Add Field</button>
        <ChooseFieldDialog open={open} onClose={handleClose} />

        <div className="adena-tab-designer-main">
          <div className="adena-tab-designer-fields">{renderedFields}</div>
        </div>
      </div>
    </>
  );
}
