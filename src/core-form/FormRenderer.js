import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { a11yProps, TabPanel } from "../core-design/tools/TabPanel";
import FIELDS_MODELS from "../core-fields/field-models";
import { loadFormConfig } from "../utils/browser-storage";
import Card from "./Card";
import getFormObj from "./tools/form-object-generator";

export default function FormRenderer() {
  const { id } = useParams();
  const [formConfig] = useState(() => loadFormConfig(id));
  const [formData, setFormData] = useState(() => getFormObj(formConfig));
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeData = (tab, container, field, data) => {
    setFormData((form) => ({
      ...form,
      [tab]: {
        ...form[tab],
        [container]: {
          ...form[tab][container],
          [field]: data,
        },
      },
    }));
  };

  const renderedTabs = formConfig.layout.map((x, i) => (
    <TabPanel key={i} value={tabValue} index={i}>
      {x.data.children.map((card, idx) => (
        <div key={idx}>
          <Card config={card}>
            {card.data.children.map((field, index) => (
              <div key={index} className="adena-form-fields">
                {FIELDS_MODELS(field, (fieldData) =>
                  handleChangeData(x.name, card.name, field.name, fieldData)
                )}
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
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
