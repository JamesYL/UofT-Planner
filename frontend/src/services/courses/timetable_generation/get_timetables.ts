import { createEmptyTimetable } from "./timetable";
import { FullTimetable, SimplifiedCourses } from "./helper";
export const getTimetables = (courses: SimplifiedCourses): FullTimetable => {
  const terms = Object.keys(courses)
    .map((key) => courses[key])
    .filter((item) => !item.disabled)
    .map((item) => item.terms);
  if (terms.length === 0) return createEmptyTimetable();
  
  return createEmptyTimetable();
};
