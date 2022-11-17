import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DropdownConfig({ config, save }) {
  const [tempConfig, setTempConfig] = React.useState(() => ({
    name: config.name,
    id: config.id,
    ...config.data,
  }));
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setTempConfig((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
        <div>
          <label>URL Based</label>
          <Checkbox
            {...label}
            checked={tempConfig.URLBase}
            onChange={handleChange}
          />
        </div>
        <TextField
          disabled={!tempConfig.URLBase}
          name="URL"
          label="URL"
          value={tempConfig.URLBase}
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" onClick={() => save(tempConfig)}>
        Save
      </Button>
    </Box>
  );
}
