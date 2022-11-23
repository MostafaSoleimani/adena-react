import TextField from "@mui/material/TextField";
import React from "react";

export default function DesignerNumberField({ config, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (onChange) onChange(value);
  };
  return (
    <TextField
      id={config.id}
      type="number"
      label={config.data.label}
      variant="outlined"
      onChange={handleChange}
    />
  );
}

export const NumberConfig = {
  name: "Number",
  data: {
    type: "Number",
    label: "How many?",
    default: 0,
  },
};
