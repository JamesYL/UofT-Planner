import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import { DarkMode } from "../../storage/settings";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useStyles } from "./Nav.css";

export interface NavProps {
  darkMode: DarkMode;
}

const Nav = ({ darkMode }: NavProps) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" className={classes.title}>
          UofT Planner
        </Typography>
        <Tooltip title="Toggle dark mode" aria-label="Toggle dark mode">
          <IconButton
            onClick={() => darkMode.setDark(!darkMode.isDark)}
            disableRipple
            color="inherit"
          >
            {darkMode.isDark ? <NightsStayIcon /> : <Brightness7Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
