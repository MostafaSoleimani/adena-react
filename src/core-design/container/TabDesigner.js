import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Icon from "@mui/material/Icon";
import React from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { designerActions } from "../../store/designer-slice";
import AdenaContainerDesigner from "./ContainerDesigner";
import "./TabDesigner.css";

export default function AdenaTabDesigner({ config }) {
  const dispatch = useDispatch();
  const addContainer = () => {
    dispatch(
      designerActions.addContainer({
        tabId: config.id,
        container: {
          id: uuid(),
          name: `container${config.data.children.length}`,
          data: {
            label: "Simple Container",
            type: "Container",
            children: [],
            style: {},
          },
        },
      })
    );
  };

  const handleTabNameChange = (e) => {
    const label = e.target.value;
    dispatch(
      designerActions.editTab({
        name: config.name,
        id: config.id,
        data: { ...config.data, label },
      })
    );
  };

  const renderedContainers = config.data.children.map((x, i) => (
    <AdenaContainerDesigner key={i} config={x} tabId={config.id} />
  ));
  return (
    <div className="adena-tab-designer-main">
      <div className="adena-tab-designer-nav">
        <TextField
          name="tabName"
          label="Tab Name"
          defaultValue={config.data.label}
          onChange={handleTabNameChange}
          size="small"
        />
      </div>
      {renderedContainers}
      <Button
        color="primary"
        variant="contained"
        onClick={addContainer}
        sx={{ margin: "1rem" }}
      >
        Add Container<Icon>add_circle</Icon>
      </Button>
    </div>
  );
}
