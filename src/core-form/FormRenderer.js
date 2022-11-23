import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadFormConfig } from "../utils/browser-storage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { a11yProps, TabPanel } from "../core-design/tools/TabPanel";
import Card from "./Card";
import FIELDS_MODELS from "../core-fields/field-models";

export default function FormRenderer() {
  const { id } = useParams();
  const [formConfig] = useState(() => loadFormConfig(id));
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderedTabs = formConfig.layout.map((x, i) => (
    <TabPanel key={i} value={tabValue} index={i}>
      {x.data.children.map((card, idx) => (
        <div key={idx}>
          <Card config={card}>
            {card.data.children.map((field, index) => (
              <div key={index} className="adena-form-fields">
                {FIELDS_MODELS(field)}
              </div>
            ))}
          </Card>
        </div>
      ))}
    </TabPanel>
  ));

  const renderedTabButtons = formConfig.layout.map((x, i) => (
    <Tab key={i} label={x.data.label} {...a11yProps(i)} />
  ));

  return (
    <div>
      <div className="adena-form-renderer-nav">
        <h1>{formConfig.name}</h1>
        <Link to={`/design/${id}`}>Edit Design</Link>
      </div>
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
        </Box>
        {renderedTabs}
      </div>
    </div>
  );
}
