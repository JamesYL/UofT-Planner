import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import useStorage from "../storage/useStorage";
import { theme } from "../theme";
import Nav from "./nav/Nav";
import DrawerSelector from "./drawer/DrawerSelector";
import useStyles from "./App.css";
import TimetablePage from "./pages/timetable/TimetablePage";
import { Switch, Route } from "react-router-dom";
import ImportEvents from "./pages/import_events/ImportEvents";
import ShowCourses from "./pages/show_courses/ShowCourses";

const App = () => {
  const darkMode = useStorage<boolean>({ key: "isDarkMode" });
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme(darkMode[0])}>
      <CssBaseline />
      <Switch>
        <div className={classes.root}>
          <DrawerSelector />
          <Nav darkMode={darkMode} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route path="/edit">
              <ShowCourses />
            </Route>
            <Route path="/import">
              <ImportEvents />
            </Route>
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
