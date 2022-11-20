import * as React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../core/tools/browser-storage";

export default function AdenaDesigner() {
  const [savedForms] = React.useState( () => loadState());
  const formLinks = savedForms.map((form) => (
    <li key={form.id}>
      <Link to={`${form.id}`}>{form.name}</Link>
    </li>
  ));
  return (
    <div>
    <Link to="new">New Design</Link>
      <ul>{formLinks}</ul>
    </div>
  );
}
