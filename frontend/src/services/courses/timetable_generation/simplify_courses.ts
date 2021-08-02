import { Course, Meeting } from "../courses";
import { SimplifiedCourses, SimplifiedTerm, MeetingByActivity } from "./helper";
const simplifyCourses = (courses: Course[]): SimplifiedCourses => {
  const ans: SimplifiedCourses = {};
  courses.forEach((course) => {
    const code = course.code.substring(0, 6);
    if (!(code in ans)) ans[code] = { disabled: false, terms: [] };
    ans[code].terms.push(simplifyTerm(course));
  });
  return ans;
};

const simplifyTerm = (course: Course): SimplifiedTerm => {
  const ans: SimplifiedTerm = {
    ...course,
    meetingsByActivity: simplifyMeetingsByActivity(course.meetings),
    disabled: false,
  };
  return ans;
};

const simplifyMeetingsByActivity = (meetings: Meeting[]): MeetingByActivity => {
  const ans: MeetingByActivity = { LEC: [], TUT: [], PRA: [] };
  meetings.forEach((meeting) =>
    ans[meeting.teachingMethod].push({ ...meeting, disabled: false })
  );
  return ans;
};
const addToSimplifiedCourses = (
  newCourses: Course[],
  existing?: SimplifiedCourses
): SimplifiedCourses => ({ ...existing, ...simplifyCourses(newCourses) });
export default addToSimplifiedCourses;
