import { Alert, Snackbar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import {
  designerActions,
  designerSelect,
  fetchFormById,
} from "../../store/designer-slice";
import { saveState } from "../../utils/browser-storage";
import FieldNav from "../tools/FieldNav";
import downloadFile from "../tools/file-exporter";
import { a11yProps, TabPanel } from "../tools/TabPanel";
import "./FormDesigner.css";
import AdenaTabDesigner from "./TabDesigner";

export default function FormDesigner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formDesign = useSelector(designerSelect);
  const [tabValue, setTabValue] = React.useState(0);
  const [openSnack, setOpenSnack] = React.useState(false);
  React.useEffect(() => {
    dispatch(fetchFormById(id));
  }, [dispatch, id]);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTabNameChange = (e) => {
    const { value } = e.target;
    dispatch(designerActions.editForm({ name: value }));
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
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

  const shiftLeftTab = () => {
    dispatch(designerActions.shiftLeftTab(tabValue));
    setTabValue((pre) => pre - 1);
  };
  const shiftRightTab = () => {
    dispatch(designerActions.shiftRightTab(tabValue));
    setTabValue((pre) => pre + 1);
  };

  const SaveForm = () => {
    saveState(formDesign);
    setOpenSnack(true);
  };

  const SaveAndDemoForm = () => {
    saveState(formDesign);
    setOpenSnack(true);
    // Make sure that form saved correctly
    setTimeout(() => {
      navigate(`/view/${formDesign.id}`);
    }, 100);
  };

  const removeTab = (idx) => {
    if (idx === formDesign.length - 1) setTabValue(formDesign.length - 2);
    dispatch(designerActions.removeTab(formDesign.layout[idx].id));
  };

  const exportJson = () => {
    downloadFile(formDesign, `${formDesign.name}-schema`);
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
      <div className="adena-form-design-nav">
        <TextField
          label="Design Name"
          id="outlined-size-small"
          value={formDesign.name}
          size="small"
          onChange={handleTabNameChange}
        />
        <div className="fx gap">
          <Button color="primary" variant="contained" onClick={exportJson}>
            Export
          </Button>

          <Button color="primary" variant="contained" onClick={SaveForm}>
            Save
          </Button>

          <Button color="primary" variant="contained" onClick={SaveAndDemoForm}>
            Save&Demo
          </Button>
        </div>
      </div>
      <main className="adena-tab-designer-main">
        <div className="adena-tab-designer-main-tabs">
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              {renderedTabButtons}
            </Tabs>
            <div>
              <FieldNav
                add={addTab}
                remove={
                  formDesign.layout.length > 0
                    ? () => removeTab(tabValue)
                    : null
                }
                label=""
                shiftRight={
                  formDesign.layout.length > 0 &&
                  tabValue !== formDesign.layout.length - 1
                    ? shiftRightTab
                    : null
                }
                shiftLeft={
                  formDesign.layout.length > 0 && tabValue !== 0
                    ? shiftLeftTab
                    : null
                }
              />
            </div>
          </Box>
          {renderedTabs}
        </div>
      </main>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: "100%" }}
        >
          Design Saved Successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
