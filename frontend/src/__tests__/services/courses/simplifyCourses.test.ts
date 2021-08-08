import { SimplifiedCourses } from "./../../../services/courses/timetable_generation/helper";
import { Course } from "../../../services/courses/courses";
import simplifyCourses, {
  deleteCourse,
  disableEnableCourse,
  deleteTerm,
  disableEnableTerm,
  deleteMeeting,
  disableEnableMeeting,
} from "../../../services/courses/timetable_generation/simplifyCourses";

import courses1 from "./data/CSC108.json";
import courses2 from "./data/MAT237.json";

describe("Modifying simplified courses", () => {
  it("Create simplified courses", () => {
    const courses = getSimplifiedCourses();
    expect("CSC108" in courses && "MAT237" in courses).toEqual(true);
    expect(Object.keys(courses).length).toEqual(2);
  });
  it("Delete course", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const cpy = deleteCourse(courses, code, true);
    expect(Object.keys(cpy).length).toEqual(1);
    expect(Object.keys(courses).length).toEqual(2);
    const notCpy = deleteCourse(courses, code, false);
    expect(Object.keys(notCpy).length).toEqual(1);
    expect(Object.keys(courses).length).toEqual(1);
  });
  it("Disable and enable course", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const cpy = disableEnableCourse(courses, code, true);
    expect(cpy[code].disabled).toEqual(true);
    expect(courses[code].disabled).toEqual(false);
    const notCpy = disableEnableCourse(courses, code, false);
    expect(notCpy[code].disabled).toEqual(true);
    expect(courses[code].disabled).toEqual(true);
    disableEnableCourse(courses, code, false);
    expect(courses[code].disabled).toEqual(false);
  });
  it("Delete term", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    expect(courses[code].terms.length).toEqual(2);
    const cpy = deleteTerm(courses, courses[code].terms[0], true);
    expect(courses[code].terms.length).toEqual(2);
    expect(cpy[code].terms.length).toEqual(1);
    const notCpy = deleteTerm(courses, courses[code].terms[0], false);
    expect(courses[code].terms.length).toEqual(1);
    expect(notCpy[code].terms.length).toEqual(1);
  });
  it("Disable and enable term", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const cpy = disableEnableTerm(courses, courses[code].terms[0], true);
    expect(courses[code].terms[0].disabled).toEqual(false);
    expect(cpy[code].terms[0].disabled).toEqual(true);
    const notCpy = disableEnableTerm(courses, courses[code].terms[0], false);
    expect(courses[code].terms[0].disabled).toEqual(true);
    expect(notCpy[code].terms[0].disabled).toEqual(true);
    disableEnableTerm(courses, courses[code].terms[0], false);
    expect(courses[code].terms[0].disabled).toEqual(false);
  });
  it("Delete meeting", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const oriLength = courses[code].terms[0].meetingsByActivity["LEC"].length;
    const getMeetings = (courses: SimplifiedCourses) =>
      courses[code].terms[0].meetingsByActivity["LEC"];
    const cpy = deleteMeeting(courses, getMeetings(courses)[0], true);
    expect(getMeetings(cpy).length).toEqual(oriLength - 1);
    expect(getMeetings(courses).length).toEqual(oriLength);
    const notCpy = deleteMeeting(courses, getMeetings(courses)[0], false);
    expect(getMeetings(notCpy).length).toEqual(oriLength - 1);
    expect(getMeetings(courses).length).toEqual(oriLength - 1);
  });
  it("Disable and enable meeting", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const getMeetings = (courses: SimplifiedCourses) =>
      courses[code].terms[0].meetingsByActivity["LEC"];
    const cpy = disableEnableMeeting(courses, getMeetings(courses)[0], true);
    expect(getMeetings(cpy)[0].disabled).toEqual(true);
    expect(getMeetings(courses)[0].disabled).toEqual(false);
    const notCpy = disableEnableMeeting(
      courses,
      getMeetings(courses)[0],
      false
    );
    expect(getMeetings(notCpy)[0].disabled).toEqual(true);
    expect(getMeetings(courses)[0].disabled).toEqual(true);
    disableEnableMeeting(courses, getMeetings(courses)[0], false);
    expect(getMeetings(courses)[0].disabled).toEqual(false);
  });
});

const getSimplifiedCourses = (): SimplifiedCourses => {
  let res = simplifyCourses(courses1 as Course[]);
  res = simplifyCourses(courses2 as Course[], res);
  return res;
};
