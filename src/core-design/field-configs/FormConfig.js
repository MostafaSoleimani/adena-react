import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function FormConfig({ config, save }) {
  const [tempConfig, setTempConfig] = React.useState(() => ({
    ...config,
    modifiedAt: new Date().toString(),
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
          multiline
          rows={4}
          name="description"
          label="Description"
          value={tempConfig.description}
          onChange={handleChange}
        />
        <TextField
          name="version"
          label="Version"
          value={tempConfig.version}
          onChange={handleChange}
        />
        <TextField
          name="submitURL"
          label="Submit URL"
          value={tempConfig.submitURL}
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" onClick={() => save(tempConfig)}>
        Save
      </Button>
    </Box>
  );
}
