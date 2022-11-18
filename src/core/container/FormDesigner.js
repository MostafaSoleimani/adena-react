import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Button from "@mui/material/Button";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { designerActions } from "../../store/designer-slice";
import { a11yProps, TabPanel } from "../tools/TabPanel";
import AdenaTabDesigner from "./TabDesigner";

export default function FormDesigner() {
  const tabs = useSelector((state) => state.designer.layout);
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const addTab = () => {
    dispatch(
      designerActions.addTab({
        name: `Tab ${tabs.length}`,
        id: uuid(),
        data: {
          type: "Tab",
          label: `Tab ${tabs.length}`,
          children: [],
        },
      })
    );
  };

  const renderedTabs = tabs.map((x, i) => (
    <TabPanel key={i} value={tabValue} index={i}>
      <AdenaTabDesigner config={x} />
    </TabPanel>
  ));

  const renderedTabButtons = tabs.map((x, i) => (
    <Tab key={i} label={x.data.label} {...a11yProps(i)} />
  ));
  return (
    <>
      <header>
        <h2>Hi Welcome to Form Designer</h2>
        <Button color="primary" variant="contained" onClick={addTab}>
          Add Tab<Icon>add_circle</Icon>
        </Button>
      </header>
      <main className="adena-tab-designer-main">
        <div>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              {renderedTabButtons}
            </Tabs>
          </Box>
          {renderedTabs}
        </div>
      </main>
    </>
  );
}
