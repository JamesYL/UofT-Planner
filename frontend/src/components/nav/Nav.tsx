import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import useStyles from "./Nav.css";
import { NavProps } from "./Nav.types";

const Nav = (props: NavProps) => {
  const { darkMode } = props;
  const classes = useStyles(props);
  return (
    <AppBar position="fixed" className={classes.appBar}>
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
