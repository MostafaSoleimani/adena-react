import React from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DesignerCheckbox({ config }) {
  return (
    <div>
      <label>{config.data.label}</label>
      <Checkbox {...label} />
    </div>
  );
}
