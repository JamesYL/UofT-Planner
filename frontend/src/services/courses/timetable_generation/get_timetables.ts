import { createEmptyTimetable } from "./timetable";
import {
  CombinedSimplifiedMeeting,
  FullTimetable,
  MeetingByActivity,
  SimplifiedCourses,
  SimplifiedMeeting,
  SimplifiedSchedule,
} from "./helper";

export const timeComparator = (
  a: SimplifiedSchedule,
  b: SimplifiedSchedule
): number => {
  const aTime =
    a.meetingDay * 48 +
    parseInt(a.startHour) * 2 +
    ~~(parseInt(a.startMin) / 30);
  const bTime =
    b.meetingDay * 48 +
    parseInt(b.startHour) * 2 +
    ~~(parseInt(b.startMin) / 30);
  return bTime - aTime;
};

/**
 * Two meetings that have same delivery method and schedules with same type of activity
 */
export const sameMeeting = (
  meeting1: SimplifiedMeeting,
  meeting2: SimplifiedMeeting
): boolean => {
  if (meeting1.teachingMethod !== meeting2.teachingMethod) return false;
  else if (meeting1.deliveryMode !== meeting2.deliveryMode) return false;
  else if (meeting1.deliveryMode === "ONLASYNC") {
    if (meeting1.contactHours !== meeting2.contactHours) return false;
    return true;
  } else if (meeting1.simpleSchedule !== meeting2.simpleSchedule) {
    return false;
  } else {
    const schedule1 = [...meeting1.simpleSchedule];
    const schedule2 = [...meeting2.simpleSchedule];
    schedule1.sort(timeComparator);
    schedule2.sort(timeComparator);
    for (let i = 0; i < schedule1.length; i++) {
      if (
        schedule1[i].meetingDay !== schedule2[i].meetingDay ||
        schedule1[i].startHour !== schedule2[i].startHour ||
        schedule1[i].startMin !== schedule2[i].startMin ||
        schedule1[i].endHour !== schedule2[i].endHour ||
        schedule1[i].endMin !== schedule2[i].endMin
      )
        return false;
    }
    return true;
  }
};
export const getSameMeetings = (
  meetings: SimplifiedMeeting[]
): CombinedSimplifiedMeeting[] => {
  meetings = [...meetings];
  const combined: CombinedSimplifiedMeeting[] = [];
  while (meetings.length) {
    const goodMeetings: SimplifiedMeeting[] = [
      meetings.pop() as SimplifiedMeeting,
    ];
    const badMeetings: SimplifiedMeeting[] = [];
    for (let i = 0; i < meetings.length; i++) {
      if (sameMeeting(goodMeetings[0], meetings[i])) {
        goodMeetings.push(meetings[i]);
      } else {
        badMeetings.push(meetings[i]);
      }
    }
    meetings = badMeetings;
    combined.push(goodMeetings);
  }
  return combined;
};

const getPossibleSelections = (meetings: MeetingByActivity) => {
  const selections: SimplifiedMeeting[][] = [];
  const filtered1 = meetings["LEC"].filter((item) => !item.disabled);
  if (filtered1.length > 0) selections.push(filtered1);
  const filtered2 = meetings["TUT"].filter((item) => !item.disabled);
  if (filtered2.length > 0) selections.push(filtered2);
  const filtered3 = meetings["PRA"].filter((item) => !item.disabled);
  if (filtered3.length > 0) selections.push(filtered3);
  const sameMeetingSelections = selections.map((item) => getSameMeetings(item));

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
