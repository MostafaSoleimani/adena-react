import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";

export default function DesignerDropDown({ config, onChange }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setAge(value);
    if (onChange) onChange(value);
  };

  const options = config.data.options.map((x, i) => (
    <MenuItem key={i} value={x.id}>
      {x.label}
    </MenuItem>
  ));
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{config.data.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label={config.data.label}
        onChange={handleChange}
      >
        {options}
      </Select>
    </FormControl>
  );
}

export const DropdownConfig = {
  name: "Dropdown",
  data: {
    type: "Dropdown",
    label: "Which one?",
    default: null,
    options: [
      { label: "Ten", id: 10 },
      { label: "Twenty", id: 20 },
      { label: "Thirty", id: 30 },
    ],
    URLBase: false,
    URL: null,
  },
};
