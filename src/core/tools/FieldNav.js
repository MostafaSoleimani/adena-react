import React from "react";
import uuid from "react-uuid";
import Icon from "@mui/material/Icon";
import ChooseFieldDialog from "../tools/ChooseFieldDialog";

export default function FieldNav({ config, remove, edit, add }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    add({
      id: config.id,
      field: {
        id: uuid(),
        name: value,
        data: {
          type: value,
          label: value,
          placeholder: value,
        },
      },
    });
  };
  return (
    <div className="designer-container-bar">
      <div>
        <label>{config.data.type}</label>
      </div>
      <div>
        <Icon color="primary" onClick={remove}>
          delete_circle
        </Icon>
        <Icon color="primary" onClick={edit}>
          edit_circle
        </Icon>
        {add &&<Icon color="primary" onClick={handleClickOpen}>
          add_circle
        </Icon>}
        <ChooseFieldDialog open={open} onClose={handleClose} />
      </div>
    </div>
  );
}
