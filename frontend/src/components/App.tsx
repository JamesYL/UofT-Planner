import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useDarkMode } from "../storage/settings";
import { theme } from "../theme";
import Nav from "./nav/Nav";
import DrawerSelector from "./drawer/DrawerSelector";
import useStyles from "./App.css";
import TimetablePage from "./pages/TimetablePage";

const App = () => {
  
  const darkMode = useDarkMode();
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme(darkMode.isDark)}>
      <div className={classes.root}>
        <CssBaseline />
        <DrawerSelector />
        <Nav darkMode={darkMode} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <TimetablePage />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
