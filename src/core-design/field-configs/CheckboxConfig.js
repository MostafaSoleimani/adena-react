import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function CheckboxConfig({ config, save }) {
  const [tempConfig, setTempConfig] = React.useState(() => ({
    name: config.name,
    id: config.id,
    ...config.data,
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          name="name"
          label="name"
          value={tempConfig.name}
          onChange={handleChange}
        />
        <TextField
          required
          name="label"
          label="label"
          value={tempConfig.label}
          onChange={handleChange}
        />
        <TextField
          name="placeholder"
          label="Place Holder"
          value={tempConfig.placeholder}
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" onClick={() => save(tempConfig)}>Save</Button>
    </Box>
  );
}
