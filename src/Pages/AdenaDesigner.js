import * as React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../utils/browser-storage";

export default function AdenaDesigner() {
  const [savedForms] = React.useState(() => loadState());
  const formLinks = savedForms.map((form) => (
    <li key={form.id}>
      <Link to={`view/${form.id}`}>{form.name}</Link>
    </li>
  ));
  return (
    <div>
      {formLinks.length === 0 && (
        <h1>
          Come On! You have not implemented any form yet! Please try new design
        </h1>
      )}
      <ul>{formLinks}</ul>
    </div>
  );
}
