import { Button } from "@mui/material";
import Icon from "@mui/material/Icon";
import React from "react";

export default function FieldNav({
  remove,
  edit,
  add,
  label,
  shiftRight,
  shiftLeft,
}) {
  return (
    <div className="designer-container-bar">
      <div>
        <label>{label}</label>
      </div>
      <div className="fx">
        {shiftLeft && (
          <Button onClick={shiftLeft} className="icon-btn">
            <Icon color="primary">arrow_back</Icon>
          </Button>
        )}
        {remove && (
          <Button onClick={remove} className="icon-btn">
            <Icon color="primary">delete_circle</Icon>
          </Button>
        )}
        {edit && (
          <Button onClick={edit} className="icon-btn">
            <Icon color="primary">edit_circle</Icon>
          </Button>
        )}
        {add && (
          <Button onClick={add} className="icon-btn">
            <Icon color="primary">add_circle</Icon>
          </Button>
        )}
        {shiftRight && (
          <Button onClick={shiftRight} className="icon-btn">
            <Icon color="primary">arrow_forward</Icon>
          </Button>
        )}
      </div>
    </div>
  );
}
