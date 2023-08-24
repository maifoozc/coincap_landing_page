import react from "react";
import "./Navbar.scss";
import { IconButton, Typography } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_content">
        <Typography>Coins</Typography>
        <Typography>Exchanges</Typography>
        <Typography>Swap</Typography>
      </div>
      <div>
        <img src="https://coincap.io/static/logos/black.svg" alt="icon" />
      </div>
      <div className="navbar_content">
        <Typography>USD</Typography>
        <Typography>English</Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </div>
    </div>
  );
}
