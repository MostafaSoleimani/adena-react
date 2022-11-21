import * as React from "react";
import { Link } from "react-router-dom";
import { loadState } from "../core-design/tools/browser-storage";
import logo from "../logo-no-background.png";
import "./AdenaDesigner.css";

export default function AdenaDesigner() {
  const [savedForms] = React.useState(() => loadState());
  const formLinks = savedForms.map((form) => (
    <li key={form.id}>
      <Link to={`${form.id}`}>{form.name}</Link>
    </li>
  ));
  return (
    <div>
      <header className="adena-designer-header">
        <img src={logo} alt="Adena Logo" />
        <Link to="new">New Design</Link>
      </header>
      <main>
      {formLinks.length === 0 && <h1>You don't implement any form so far! Please try new design</h1>}
        <ul>{formLinks}</ul>
      </main>
      <footer></footer>
    </div>
  );
}
