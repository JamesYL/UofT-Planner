import getTimetables from "../../../services/courses/timetable_generation/getTimetables";
import { SimplifiedCourses } from "../../../services/courses/timetable_generation/helper";
import courses1 from "./data/CSC108.json";
import courses2 from "./data/MAT237.json";
import simplifyCourses from "../../../services/courses/timetable_generation/simplifyCourses";
import { Course } from "../../../services/courses/getCourse";
it("test", () => {
  const timetable = getTimetables(getSimplifiedCourses());
});


const getSimplifiedCourses = (): SimplifiedCourses => {
  let res = simplifyCourses(courses1 as Course[]);
  res = simplifyCourses(courses2 as Course[], res);
  return res;
};
