import Checkbox from "@mui/material/Checkbox";
import React from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DesignerCheckbox({ config, onChange }) {
  const handleChange = (e) => {
    const checked = e.target.checked;
    if (onChange) onChange(checked);
  };

  return (
    <div>
      <label>{config.data.label}</label>
      <Checkbox {...label} onChange={handleChange} />
    </div>
  );
}

export const CheckboxConfig = {
  name: "Checkbox",
  data: {
    type: "Checkbox",
    label: "Is Something?",
    default: false,
  },
};
