import React from "react";
import TextField from "@mui/material/TextField";
import uuid from "react-uuid";

export default function DesignerTextField({ config, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (onChange) onChange(value);
  };
  return (
    <TextField
      id={config.id}
      label={config.data.label}
      variant="outlined"
      onChange={handleChange}
    />
  );
}

export const TextConfig = {
  name: "Text",
  id: uuid(),
  data: {
    type: "Text",
    label: "Name of ?",
    default: "",
  },
};
