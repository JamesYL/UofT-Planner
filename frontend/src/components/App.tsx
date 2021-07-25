import React from "react";
import Timetable from "./timetable/Timetable";
import { TimetableProp } from "./timetable/Timetable.types";

const App = () => {
  const tmpTimetable = {
    dayStart: 8,
    dayEnd: 22,
    title: "Fall",
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
  return (
    <div style={{ height: 600, width: 800 }}>
      <Timetable {...(tmpTimetable as TimetableProp)} />
    </div>
  );
};

export default App;
