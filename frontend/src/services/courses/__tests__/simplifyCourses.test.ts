import { SimplifiedCourses } from "../helper";
import { Course } from "../getCourse";
import simplifyCourses, {
  deleteCourse,
  disableEnableCourse,
  deleteTerm,
  disableEnableTerm,
  deleteMeeting,
  disableEnableMeeting,
} from "../simplifyCourses";

import csc108 from "./data/CSC108.json";
import mat237 from "./data/MAT237.json";

describe("Modifying simplified courses", () => {
  it("Create simplified courses", () => {
    const courses = getSimplifiedCourses();
    expect("CSC108" in courses && "MAT237" in courses).toBe(true);
    expect(Object.keys(courses)).toHaveLength(2);
  });
  it("Delete course", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const cpy = deleteCourse(courses, code, true);
    expect(Object.keys(cpy)).toHaveLength(1);
    expect(Object.keys(courses)).toHaveLength(2);
    const notCpy = deleteCourse(courses, code, false);
    expect(Object.keys(notCpy)).toHaveLength(1);
    expect(Object.keys(courses)).toHaveLength(1);
  });
  it("Disable and enable course", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const cpy = disableEnableCourse(courses, code, true);
    expect(cpy[code].disabled).toBe(true);
    expect(courses[code].disabled).toBe(false);
    const notCpy = disableEnableCourse(courses, code, false);
    expect(notCpy[code].disabled).toBe(true);
    expect(courses[code].disabled).toBe(true);
    disableEnableCourse(courses, code, false);
    expect(courses[code].disabled).toBe(false);
  });
  it("Delete term", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    expect(courses[code].terms).toHaveLength(2);
    const cpy = deleteTerm(courses, courses[code].terms[0], true);
    expect(courses[code].terms).toHaveLength(2);
    expect(cpy[code].terms).toHaveLength(1);
    const notCpy = deleteTerm(courses, courses[code].terms[0], false);
    expect(courses[code].terms).toHaveLength(1);
    expect(notCpy[code].terms).toHaveLength(1);
  });
  it("Disable and enable term", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const cpy = disableEnableTerm(courses, courses[code].terms[0], true);
    expect(courses[code].terms[0].disabled).toBe(false);
    expect(cpy[code].terms[0].disabled).toBe(true);
    const notCpy = disableEnableTerm(courses, courses[code].terms[0], false);
    expect(courses[code].terms[0].disabled).toBe(true);
    expect(notCpy[code].terms[0].disabled).toBe(true);
    disableEnableTerm(courses, courses[code].terms[0], false);
    expect(courses[code].terms[0].disabled).toBe(false);
  });
  it("Delete meeting", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const oriLength = courses[code].terms[0].meetingsByActivity["LEC"].length;
    const getMeetings = (courses: SimplifiedCourses) =>
      courses[code].terms[0].meetingsByActivity["LEC"];
    const cpy = deleteMeeting(courses, getMeetings(courses)[0], true);
    expect(getMeetings(cpy)).toHaveLength(oriLength - 1);
    expect(getMeetings(courses)).toHaveLength(oriLength);
    const notCpy = deleteMeeting(courses, getMeetings(courses)[0], false);
    expect(getMeetings(notCpy)).toHaveLength(oriLength - 1);
    expect(getMeetings(courses)).toHaveLength(oriLength - 1);
  });
  it("Disable and enable meeting", () => {
    const code = "CSC108";
    const courses = getSimplifiedCourses();
    const getMeetings = (courses: SimplifiedCourses) =>
      courses[code].terms[0].meetingsByActivity["LEC"];
    const cpy = disableEnableMeeting(courses, getMeetings(courses)[0], true);
    expect(getMeetings(cpy)[0].disabled).toBe(true);
    expect(getMeetings(courses)[0].disabled).toBe(false);
    const notCpy = disableEnableMeeting(
      courses,
      getMeetings(courses)[0],
      false
    );
    expect(getMeetings(notCpy)[0].disabled).toBe(true);
    expect(getMeetings(courses)[0].disabled).toBe(true);
    disableEnableMeeting(courses, getMeetings(courses)[0], false);
    expect(getMeetings(courses)[0].disabled).toBe(false);
  });
});

const getSimplifiedCourses = (): SimplifiedCourses => {
  let res = simplifyCourses(csc108 as Course[]);
  res = simplifyCourses(mat237 as Course[], res);
  return res;
};
