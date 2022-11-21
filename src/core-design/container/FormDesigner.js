import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import uuid from "react-uuid";
import { designerActions, fetchFormById } from "../../store/designer-slice";
import { saveState } from "../tools/browser-storage";
import { a11yProps, TabPanel } from "../tools/TabPanel";
import AdenaTabDesigner from "./TabDesigner";
import Logo from "../../logo-no-background.png";
import "./FormDesigner.css";
import { display } from "@mui/system";

export default function FormDesigner() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const formDesign = useSelector((state) => state.designer);
  const [tabValue, setTabValue] = React.useState(0);
  React.useEffect(() => {
    if (id && id !== "new") {
      dispatch(fetchFormById(id));
    }
  }, [dispatch, id]);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTabNameChange = (e) => {
    const { value } = e.target;
    dispatch(designerActions.editForm({ name: value }));
  };

  const addTab = () => {
    dispatch(
      designerActions.addTab({
        name: `Tab ${formDesign.layout.length}`,
        id: uuid(),
        data: {
          type: "Tab",
          label: `Tab ${formDesign.layout.length}`,
          children: [],
        },
      })
    );
  };

  const SaveForm = () => {
    saveState(formDesign);
  };

  const renderedTabs = formDesign.layout.map((x, i) => (
    <TabPanel key={i} value={tabValue} index={i}>
      <AdenaTabDesigner config={x} />
    </TabPanel>
  ));

  const renderedTabButtons = formDesign.layout.map((x, i) => (
    <Tab key={i} label={x.data.label} {...a11yProps(i)} />
  ));
  return (
    <>
      <header className="adena-form-designer-header">
        <div className="adena-form-designer-header-left">
          <img src={Logo} alt="Logo" />
          <h2> Designer</h2>
        </div>
        {formDesign.name}
        <div className="adena-form-designer-header-right">
          <Button color="primary" variant="contained" onClick={SaveForm}>
            Save
          </Button>
        </div>
      </header>
      <main className="adena-tab-designer-main">
        <div className="adena-tab-designer-main-nav">
          <TextField
            label="Design Name"
            id="outlined-size-small"
            defaultValue="Simple Design"
            size="small"
            onChange={handleTabNameChange}
          />
        </div>
        <div className="adena-tab-designer-main-tabs">
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              {renderedTabButtons}
            </Tabs>
              <Icon onClick={addTab} color="primary">add_circle</Icon>
          </Box>
          {renderedTabs}
        </div>
      </main>
    </>
  );
}
