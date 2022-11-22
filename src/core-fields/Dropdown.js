import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import uuid from "react-uuid";

export default function DesignerDropDown({ config, onChange }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setAge(value);
    if (onChange) onChange(value);
  };
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
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export const DropdownConfig = {
  name: "Dropdown",
  id: uuid(),
  data: {
    type: "Dropdown",
    label: "Which one?",
    default: null,
    options: [
        {name: 'Ten', value: 10},
        {name: 'Twenty', value: 20},
        {name: 'Thirty', value: 30},
    ],
    URLBase: false,
    URL: null
  },
}
