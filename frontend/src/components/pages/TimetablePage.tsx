import React from "react";
import Timetable from "./timetable/Timetable";
import { TimetableProp } from "./timetable/Timetable.types";
const tmpTimetable1 = {
  dayStart: 8,
  dayEnd: 22,
  title: "First",
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
const tmpTimetable2 = {
  dayStart: 8,
  dayEnd: 22,
  title: "Second",
  allEvents: [],
};
const TimetablePage = () => {
  return (
    <div>
      <Timetable {...(tmpTimetable1 as TimetableProp)} />
      <Timetable {...(tmpTimetable2 as TimetableProp)} />
    </div>
  );
};

export default TimetablePage;
