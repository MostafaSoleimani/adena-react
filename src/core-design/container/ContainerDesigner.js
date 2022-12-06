import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { useDispatch } from "react-redux";
import FIELDS_MODELS from "../../core-fields/field-models";
import { designerActions } from "../../store/designer-slice";
import DESIGN_FIELD_CONFIGS from "../field-configs/field-config.model";
import ChooseFieldDialog from "../tools/ChooseFieldDialog";
import FieldNav from "../tools/FieldNav";
import "./ContainerDesigner.css";

export default function AdenaContainerDesigner({ config, tabId }) {
  const [open, setOpen] = React.useState(false);
  const [editComponent, setEditComponent] = React.useState();
  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = (value) => {
    setOpenAdd(true);
  };

  const handleCloseAdd = (field) => {
    setOpenAdd(false);
    if (field) addField(field);
  };
  const dispatch = useDispatch();
  const addField = (value) => {
    dispatch(
      designerActions.addField({ tabId, containerId: config.id, field: value })
    );
  };

  const removeField = (field) => {
    dispatch(
      designerActions.removeField({ tabId, containerId: config.id, field })
    );
  };
  const removeContainer = () => {
    dispatch(
      designerActions.removeContainer({ tabId, containerId: config.id })
    );
  };

  const handleEdit = (fieldConfig, parentId) => {
    setEditComponent(
      DESIGN_FIELD_CONFIGS(fieldConfig, (conf) => handleClose(conf, parentId))
    );
    setOpen(true);
  };

  const handleClose = (fieldConfig, parentId) => {
    setOpen(false);
    if (parentId) {
      dispatch(
        designerActions.editField({
          tabId,
          containerId: config.id,
          field: fieldConfig,
        })
      );
    } else {
      dispatch(
        designerActions.editContainer({ tabId, container: fieldConfig })
      );
    }
  };

  const shiftLeftContainer = () => {
    dispatch(designerActions.shiftLeftContainer({ tabId, container: config }));
  };

  const shiftRightContainer = () => {
    dispatch(designerActions.shiftRightContainer({ tabId, container: config }));
  };

  const shiftLeftField = (field) => {
    dispatch(
      designerActions.shiftLeftField({ tabId, containerId: config.id, field })
    );
  };

  const shiftRightField = (field) => {
    dispatch(
      designerActions.shiftRightField({ tabId, containerId: config.id, field })
    );
  };

  const renderedFields = config.data.children.map((x, i) => (
    <div key={i} className="adena-designer-fields">
      <FieldNav
        remove={() => removeField(x)}
        config={x}
        edit={() => handleEdit(x, config.id)}
        label={x.data.type}
        shiftLeft={() => shiftLeftField(x)}
        shiftRight={() => shiftRightField(x)}
      />
      {FIELDS_MODELS(x)}
    </div>
  ));
  return (
    <div className="designer-container">
      <FieldNav
        add={handleClickOpenAdd}
        remove={removeContainer}
        edit={() => handleEdit(config, null)}
        config={config}
        label={config.data.label}
        shiftLeft={shiftLeftContainer}
        shiftRight={shiftRightContainer}
      />

      <div className="adena-container-designer-main">
        <div className="adena-container-designer-fields">{renderedFields}</div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Configurations</DialogTitle>
        <DialogContent>{editComponent}</DialogContent>
      </Dialog>
      <ChooseFieldDialog open={openAdd} onClose={handleCloseAdd} />
    </div>
  );
}
