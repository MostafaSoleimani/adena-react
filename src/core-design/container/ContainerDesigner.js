import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useDispatch } from "react-redux";
import FIELDS_MODELS from "../../core-fields/field-models";
import { designerActions } from "../../store/designer-slice";
import DESIGN_FIELD_CONFIGS from "../field-configs/field-config.model";
import FieldNav from "../tools/FieldNav";
import "./ContainerDesigner.css";

export default function AdenaContainerDesigner({ config, tabId }) {
  const [open, setOpen] = React.useState(false);
  const [editComponent, setEditComponent] = React.useState();
  const dispatch = useDispatch();
  const addField = (value) => {
    dispatch(designerActions.addField({tabId, containerId: config.id, ...value}));
  };

  const removeField = (field) => {
    dispatch(designerActions.removeField({ tabId, containerId: config.id, field }));
  };
  const removeContainer = () => {
    dispatch(designerActions.removeContainer({tabId, containerId: config.id}));
  };

  const handleClickOpen = (fieldConfig, parentId) => {
    setEditComponent(
      DESIGN_FIELD_CONFIGS(fieldConfig, (conf) => handleClose(conf, parentId))
    );
    setOpen(true);
  };

  const handleClose = (fieldConfig, parentId) => {
    setOpen(false);
    if (parentId) {
      dispatch(designerActions.editField({tabId, containerId: config.id, field: fieldConfig}));
    } else {
      dispatch(designerActions.editContainer({tabId, container: fieldConfig}));
    }
  };

  const renderedFields = config.data.children.map((x, i) => (
    <div key={i} className="adena-designer-fields">
      <FieldNav
        remove={() => removeField(x)}
        config={x}
        edit={() => handleClickOpen(x, config.id)}
        label={x.data.type}
      />
      {FIELDS_MODELS(x)}
    </div>
  ));
  return (
    <div className="designer-container">
      <FieldNav
        add={addField}
        remove={removeContainer}
        edit={() => handleClickOpen(config, null)}
        config={config}
        label={config.data.label}
      />

      <div className="adena-container-designer-main">
        <div className="adena-container-designer-fields">{renderedFields}</div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configurations</DialogTitle>
        <DialogContent>{editComponent}</DialogContent>
      </Dialog>
    </div>
  );
}
