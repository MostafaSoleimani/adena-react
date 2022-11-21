import { Link } from "react-router-dom";
import LOGO from "../logo-no-background.png";

export default function Header() {
  return (
    <header className="adena-designer-header">
      <img src={LOGO} alt="Adena Logo" />
      <Link to="/">Designs</Link>
    </header>
  );
}
