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
        start: { hour: 11, minute: 30 },
        end: { hour: 13, minute: 45 },
        color: "#FFFFFF",
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
