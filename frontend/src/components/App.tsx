import { Paper, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useDarkMode } from "../storage/settings";
import { theme } from "../theme";
import Nav from "./nav/Nav";
import Timetable from "./timetable/Timetable";
import { TimetableProp } from "./timetable/Timetable.types";

const App = () => {
  const tmpTimetable = {
    dayStart: 8,
    dayEnd: 22,
    title: "Winter",
    allEvents: [
      {
        dayOfWeek: 3,
        start: { hour: 11, minute: 15 },
        end: { hour: 13, minute: 45 },
        background: "red",
        text: "CSC222",
      },
      {
        dayOfWeek: 3,
        start: { hour: 12, minute: 45 },
        end: { hour: 15, minute: 45 },
        background: "lightblue",
        text: "CSC224",
        onClick: () => console.log("224"),
      },
    ],
  };
  const darkMode = useDarkMode();
  return (
    <ThemeProvider theme={theme(darkMode.isDark)}>
      <div style={{ height: 600, width: 800 }}>
        <Nav darkMode={darkMode} />
        <Timetable {...(tmpTimetable as TimetableProp)} />
        <Paper>test</Paper>
      </div>
    </ThemeProvider>
  );
};

export default App;
