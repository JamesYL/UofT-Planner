import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { useDarkMode } from "../storage/settings";
import { theme } from "../theme";
import Nav from "./nav/Nav";
import DrawerSelector from "./drawer/DrawerSelector";
import useStyles from "./App.css";
import TimetablePage from "./pages/TimetablePage";
import { Switch, Route } from "react-router-dom";

const App = () => {
  const darkMode = useDarkMode();
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme(darkMode.isDark)}>
      <CssBaseline />
      <Switch>
        <div className={classes.root}>
          <DrawerSelector />
          <Nav darkMode={darkMode} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route path="/edit">events</Route>
            <Route path="/import">import courses</Route>
            <Route path="/timetable">
              <TimetablePage />
            </Route>
            <Route exact path="/">
              <TimetablePage />
            </Route>
          </main>
        </div>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
