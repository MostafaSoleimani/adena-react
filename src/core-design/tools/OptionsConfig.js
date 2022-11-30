import { Label } from "@mui/icons-material";
import { Button, Icon, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function OptionsConfig({ onAdd, onDelete, onChange, options }) {
  const rows = options.map((option, idx) => (
    <div key={idx}>
      <TextField
        required
        label="id"
        name="id"
        onChange={(e) => onChange(idx, "id", e.target.value)}
        value={option.id}
        size="small"
        style={{ margin: "0px" }}
      />
      <TextField
        required
        label="label"
        name="label"
        onChange={(e) => onChange(idx, "label", e.target.value)}
        value={option.label}
        size="small"
        style={{ margin: "0px" }}
      />
      <Button className="icon-btn" onClick={() => onDelete(idx)}>
        <Icon color="error">delete_circle</Icon>
      </Button>
    </div>
  ));
  return (
    <div>
      <div className="fx gap j-c-space">
        <label>Options</label>
        <Button className="icon-btn" onClick={onAdd}>
          <Icon color="primary">add_circle</Icon>
        </Button>
      </div>
      {rows}
    </div>
  );
}

OptionsConfig.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};
