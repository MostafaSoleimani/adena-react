import Icon from "@mui/material/Icon";
import React from "react";
import ChooseFieldDialog from "../tools/ChooseFieldDialog";

export default function FieldNav({
  config,
  remove,
  edit,
  add,
  label,
  shiftRight,
  shiftLeft,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (field) => {
    setOpen(false);
    add({
      containerId: config.id,
      field,
    });
  };
  return (
    <div className="designer-container-bar">
      <div>
        <label>{label}</label>
      </div>
      <div>
        <Icon onClick={shiftLeft} color="primary" disabled={!shiftLeft}>
          arrow_back
        </Icon>
        <Icon color="primary" onClick={remove}>
          delete_circle
        </Icon>
        <Icon color="primary" onClick={edit}>
          edit_circle
        </Icon>
        {add && (
          <Icon color="primary" onClick={handleClickOpen}>
            add_circle
          </Icon>
        )}
        <Icon onClick={shiftRight} color="primary" disabled={!shiftRight}>
          arrow_forward
        </Icon>
        <ChooseFieldDialog open={open} onClose={handleClose} />
      </div>
    </div>
  );
}
