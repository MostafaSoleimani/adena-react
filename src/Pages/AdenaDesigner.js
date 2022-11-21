import * as React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../core-design/tools/browser-storage";

export default function AdenaDesigner() {
  const [savedForms] = React.useState(() => loadState());
  const formLinks = savedForms.map((form) => (
    <li key={form.id}>
      <Link to={`design/${form.id}`}>{form.name}</Link>
    </li>
  ));
  return (
    <div>
      <Link to={`design/new`}>New Design</Link>
      {formLinks.length === 0 && (
        <h1>You have not implemented any form so far! Please try new design</h1>
      )}
      <ul>{formLinks}</ul>
    </div>
  );
}
