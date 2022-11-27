import { Link } from "react-router-dom";
import LOGO from "../logo-no-background.png";

export default function Header() {
  return (
    <header className="adena-designer-header">
      <img src={LOGO} alt="Adena Logo" />
      <div className="adena-nav-links">
        <Link to={`design/new`}>New Design</Link>
        <Link to="/">Designs</Link>
      </div>
    </header>
  );
}
