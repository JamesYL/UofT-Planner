import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { getCourse } from "../api/courses";
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
        background: "blue",
        text: "CSC224",
        onClick: () => console.log("224"),
      },
    ],
  };
  const darkMode = useDarkMode();
  getCourse("FSL312", "20219")
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
  return (
    <ThemeProvider theme={theme(darkMode.isDark)}>
      <CssBaseline />
      <Nav darkMode={darkMode} />
      <div style={{ height: 600, width: 800 }}>
        <Timetable {...(tmpTimetable as TimetableProp)} />
      </div>
    </ThemeProvider>
  );
};

export default App;
