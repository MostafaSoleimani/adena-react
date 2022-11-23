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
          <Icon color="primary" onClick={add}>
            add_circle
          </Icon>
        )}
        <Icon onClick={shiftRight} color="primary" disabled={!shiftRight}>
          arrow_forward
        </Icon>
      </div>
    </div>
  );
}
