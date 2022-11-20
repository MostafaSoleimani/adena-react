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

export default function FormDesigner() {
  const {id} = useParams();
  const dispatch = useDispatch();
  
  const formDesign = useSelector((state) => state.designer);
  const [tabValue, setTabValue] = React.useState(0);
  React.useEffect(() => {
    if(id && id !== 'new') {
      dispatch(fetchFormById(id))
    }
  }, [dispatch, id])
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
      <header>
        <h2>Hi Welcome to Form Designer</h2>
        {formDesign.name}
        <div>
          <TextField
            label="Size"
            id="outlined-size-small"
            defaultValue="Simple Design"
            size="small"
            onChange={handleTabNameChange}
          />
          <Button color="primary" variant="contained" onClick={SaveForm}>
            Save Form
          </Button>
          <Button color="primary" variant="contained" onClick={addTab}>
            Add Tab<Icon>add_circle</Icon>
          </Button>
        </div>
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
