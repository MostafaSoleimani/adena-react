import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import OptionsConfig from "../tools/OptionsConfig";

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
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onAddOption = () => {
    setTempConfig((prev) => ({
      ...prev,
      options: [...prev.options, { id: "id", label: "label" }],
    }));
  };
  const onDeleteOption = (idx) => {
    setTempConfig((prev) => {
      const options = [...prev.options];
      options.splice(idx, 1);
      return {
        ...prev,
        options,
      };
    });
  };
  const onChangeOption = (idx, key, value) => {
    setTempConfig((prev) => {
      const options = prev.options;
      return {
        ...prev,
        options: [
          ...options.slice(0, idx),
          { ...options[idx], [key]: value },
          ...options.slice(idx + 1),
        ],
      };
    });
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
        <OptionsConfig
          onAdd={onAddOption}
          onDelete={onDeleteOption}
          onChange={onChangeOption}
          options={tempConfig.options}
        />
      </div>
      <Button variant="contained" onClick={() => save(tempConfig)}>
        Save
      </Button>
    </Box>
  );
}
