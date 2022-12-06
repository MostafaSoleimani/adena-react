import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import LOGO from "../logo-no-background.png";

export default function Header() {
  return (
    <header className="adena-designer-header">
      <Link to="/">
        <img src={LOGO} alt="Adena Logo" className="adena-header-logo" />
      </Link>
      <div className="adena-nav-links">
        <Link to={`design/new`}>
          <Fab color="primary" aria-label="add" className="adena-fab">
            <AddIcon />
          </Fab>
        </Link>
      </div>
    </header>
  );
}
