import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../utils/browser-storage";

export default function AdenaDesigner() {
  const [savedForms] = React.useState(() => loadState());
  const fileInput = React.useRef();
  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      // console.log("e.target.result", e.target.result);
      console.log("e.target.result", JSON.parse(fileReader.result));
      // setFiles(e.target.result);
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  };
  const formLinks = savedForms.map((form) => (
    <li key={form.id}>
      <Link to={`view/${form.id}`}>{form.name}</Link>
    </li>
  ));
  return (
    <div>
      {formLinks.length === 0 && (
        <h1>
          Come On! You have not implemented any form yet! Please try new design.
          ******{" "}
          <b>
            Make Sure that all tabs and containers and fields have a unique name
          </b>{" "}
          ******
        </h1>
      )}
      {formLinks.length > 0 && (
        <div className="adena-designs">
          <ul>{formLinks}</ul>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInput.current.click()}
            >
              Import
            </Button>

            <input
              ref={fileInput}
              type="file"
              onChange={handleImport}
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
