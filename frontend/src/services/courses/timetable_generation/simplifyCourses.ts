import { Course, Meeting, Schedule, TeachingMethod } from "../courses";
import {
  SimplifiedCourses,
  SimplifiedTerm,
  MeetingByActivity,
  SimplifiedMeeting,
  SimplifiedSchedule,
} from "./helper";
import clone from "just-clone";
const simplifySchedule = (item: Schedule): SimplifiedSchedule => {
  const meetingDayToActual = {
    MO: 0,
    TU: 1,
    WE: 2,
    TH: 3,
    FR: 4,
  };
  const meetingDayToStr = {
    MO: "Mon",
    TU: "Tue",
    WE: "Wed",
    TH: "Thu",
    FR: "Fri",
  };
  const [startHour, startMinute] = item.meetingStartTime.split(":");
  const [endHour, endMinute] = item.meetingEndTime.split(":");
  return {
    meetingDay: meetingDayToActual[item.meetingDay] as 0 | 1 | 2 | 3 | 4,
    startHour: startHour,
    startMin: startMinute,
    endHour: endHour,
    endMin: endMinute,
    meetingDayStr: meetingDayToStr[item.meetingDay] as
      | "Mon"
      | "Tue"
      | "Wed"
      | "Thu"
      | "Fri",
  };
};

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
    meetingsByActivity: simplifyMeetingsByActivity(course.meetings, course),
    disabled: false,
  };
  return ans;
};

const simplifyMeetingsByActivity = (
  meetings: Meeting[],
  course: Course
): MeetingByActivity => {
  const ans: MeetingByActivity = { LEC: [], TUT: [], PRA: [] };
  meetings.forEach((meeting) =>
    ans[meeting.teachingMethod].push({
      ...meeting,
      disabled: false,
      id: `${course.code}-${course.section}-${meeting.teachingMethod}${meeting.sectionNumber}`,
      courseCode: course.code.substring(0, 6),
      section: course.section,
      simpleSchedule: meeting.schedule.map((item) => simplifySchedule(item)),
    })
  );
  return ans;
};
const addToSimplifiedCourses = (
  newCourses: Course[],
  existing?: SimplifiedCourses
): SimplifiedCourses => ({ ...existing, ...simplifyCourses(newCourses) });

export const deleteCourse = (
  existing: SimplifiedCourses,
  code: string,
  shouldClone = true
): SimplifiedCourses => {
  if (shouldClone) {
    existing = clone(existing);
  }
  delete existing[code];
  return existing;
};
export const disableEnableCourse = (
  existing: SimplifiedCourses,
  code: string,
  shouldClone = true
): SimplifiedCourses => {
  if (shouldClone) {
    existing = clone(existing);
  }
  existing[code].disabled = !existing[code].disabled;
  return existing;
};

export const deleteTerm = (
  existing: SimplifiedCourses,
  term: SimplifiedTerm,
  shouldClone = true
): SimplifiedCourses => {
  if (shouldClone) {
    existing = clone(existing);
  }
  const code = term.code.substring(0, 6);
  existing[code].terms = existing[code].terms.filter(
    (innerTerm) => innerTerm.section !== term.section
  );
  if (existing[code].terms.length === 0) deleteCourse(existing, code, false);
  return existing;
};

export const disableEnableTerm = (
  existing: SimplifiedCourses,
  term: SimplifiedTerm,
  shouldClone = true
): SimplifiedCourses => {
  if (shouldClone) {
    existing = clone(existing);
  }
  const code = term.code.substring(0, 6);
  const cpyTerm = existing[code].terms.find(
    (innerTerm) => innerTerm.section === term.section
  );
  if (cpyTerm) {
    cpyTerm.disabled = !cpyTerm.disabled;
  }
  return existing;
};

export const deleteMeeting = (
  existing: SimplifiedCourses,
  meeting: SimplifiedMeeting,
  shouldClone = true
): SimplifiedCourses => {
  if (shouldClone) {
    existing = clone(existing);
  }
  const term = existing[meeting.courseCode].terms.find(
    (term) => term.section === meeting.section
  );
  if (term) {
    term.meetingsByActivity[meeting.teachingMethod] = term.meetingsByActivity[
      meeting.teachingMethod
    ].filter(
      (innerMeeting) => innerMeeting.sectionNumber !== meeting.sectionNumber
    );
    let allEmpty = true;
    for (const key in term.meetingsByActivity) {
      if (term.meetingsByActivity[key as TeachingMethod].length !== 0) {
        allEmpty = false;
        break;
      }
    }
    if (allEmpty) deleteTerm(existing, term, false);
  }
  return existing;
};

export const disableEnableMeeting = (
  existing: SimplifiedCourses,
  meeting: SimplifiedMeeting,
  shouldClone = true
) => {
  if (shouldClone) {
    existing = clone(existing);
  }
  const term = existing[meeting.courseCode].terms.find(
    (term) => term.section === meeting.section
  );
  if (term) {
    const allMeetings = term.meetingsByActivity[meeting.teachingMethod];
    const actualMeeting = allMeetings.find(
      (item) => item.sectionNumber === meeting.sectionNumber
    );
    if (actualMeeting) {
      actualMeeting.disabled = !actualMeeting.disabled;
    }
  }
  return existing;
};

export default addToSimplifiedCourses;
