import { createEmptyTimetable } from "./timetable";
import {
  FullTimetable,
  MeetingByActivity,
  SimplifiedCourses,
  SimplifiedMeeting,
} from "./helper";
import { Schedule } from "../courses";

// const timeComparator = (a: Schedule, b: Schedule): number => {
//   const dayToInt = {
//      "MO": 1 ,"TU": 2,  "WE":3 , "TH":4 , "FR":5
//   }
//   else if (a.instructions) return 1;
//   else if (b.instructions) return -1;
//   else if (a.dayOfWeek < b.dayOfWeek) return -1;
//   else if (b.dayOfWeek < a.dayOfWeek) return 1;
//   else if (a.start < b.start) return -1;
//   else if (a.start > b.start) return 1;
//   return 0;
// };

// const sameMeeting = (
//   meeting1: SimplifiedMeeting,
//   meeting2: SimplifiedMeeting
// ): boolean => {
//   if (meeting1.teachingMethod !== meeting2.teachingMethod) return false
//   else if (meeting1.deliveryMode !== meeting2.deliveryMode) return false;
//   else if (meeting1.deliveryMode === "ONLASYNC"){
//     if (meeting1.contactHours !== meeting2.contactHours) return false;
//     return true;
//   } else {

//   }
// };

const getPossibleSelections = (meetings: MeetingByActivity) => {
  const selections: SimplifiedMeeting[][] = [];
  const filtered1 = meetings["LEC"].filter((item) => !item.disabled);
  if (filtered1.length > 0) selections.push(filtered1);
  const filtered2 = meetings["TUT"].filter((item) => !item.disabled);
  if (filtered2.length > 0) selections.push(filtered2);
  const filtered3 = meetings["PRA"].filter((item) => !item.disabled);
  if (filtered3.length > 0) selections.push(filtered3);
  
};

const getTimetables = (courses: SimplifiedCourses): FullTimetable => {
  const terms = Object.keys(courses)
    .map((key) => courses[key])
    .filter((item) => !item.disabled)
    .map((item) => item.terms);
  if (terms.length === 0) return createEmptyTimetable();

  return createEmptyTimetable();
};
export default getTimetables;
