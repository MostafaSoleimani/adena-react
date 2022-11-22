import React from "react";
import TextField from "@mui/material/TextField";
import uuid from "react-uuid";

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
  id: uuid(),
  data: {
    type: "Number",
    label: "How many?",
    default: 0,
  },
};
