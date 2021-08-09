import Timetable from "./Timetable";
import {
  CombinedSimplifiedMeeting,
  CombinedSimplifiedMeetingGrouping,
  MeetingByActivity,
  SimplifiedCourses,
  SimplifiedMeeting,
  SimplifiedSchedule,
  TimetableContent,
} from "./helper";
import { v4 as uuidv4 } from "uuid";

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
  return aTime - bTime;
};

/** Two meetings that have same delivery method and schedules with same type of activity */
export const sameMeeting = (
  meeting1: SimplifiedMeeting,
  meeting2: SimplifiedMeeting
): boolean => {
  if (
    meeting1.teachingMethod !== meeting2.teachingMethod ||
    meeting1.deliveryMode !== meeting2.deliveryMode ||
    meeting1.contactHours !== meeting2.contactHours ||
    meeting1.simpleSchedule.length !== meeting2.simpleSchedule.length
  )
    return false;
  else if (meeting1.deliveryMode === "ONLASYNC") {
    return true;
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
/** Collection of meetings that have the same schedule and delivery method and activity */
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
/** Gets a list of all LEC/PRA/TUT valid groupings */
const getValidActivityGroupings = (
  meetings: MeetingByActivity
): CombinedSimplifiedMeetingGrouping[] => {
  const selections: CombinedSimplifiedMeeting[][] = [];
  const filtered1 = meetings["LEC"].filter((item) => !item.disabled);
  if (filtered1.length > 0) selections.push(getSameMeetings(filtered1));
  const filtered2 = meetings["TUT"].filter((item) => !item.disabled);
  if (filtered2.length > 0) selections.push(getSameMeetings(filtered2));
  const filtered3 = meetings["PRA"].filter((item) => !item.disabled);
  if (filtered3.length > 0) selections.push(getSameMeetings(filtered3));
  const allValidCombinations: CombinedSimplifiedMeetingGrouping[] = [];
  getMeetingCombinations(selections, allValidCombinations);
  return allValidCombinations.filter((grouping) => {
    for (let i = 0; i < grouping.length; i++) {
      for (let j = i + 1; j < grouping.length; j++) {
        if (
          grouping[i][0].disabled ||
          grouping[j][0].disabled ||
          isOverlap(grouping[i], grouping[j])
        )
          return false;
      }
    }
    return true;
  });
};
/** Check if two meetings have overlapping schedules */
const isOverlap = (
  combinedMeetings1: CombinedSimplifiedMeeting,
  combinedMeetings2: CombinedSimplifiedMeeting
): boolean => {
  const schedules1: SimplifiedSchedule[] = combinedMeetings1[0].simpleSchedule;
  const schedules2: SimplifiedSchedule[] = combinedMeetings2[0].simpleSchedule;
  for (const s1 of schedules1) {
    for (const s2 of schedules2) {
      const start1 = parseInt(s1.startHour) * 60 + parseInt(s1.startMin);
      const end1 = parseInt(s1.endHour) * 60 + parseInt(s1.endMin);
      const start2 = parseInt(s2.startHour) * 60 + parseInt(s2.startMin);
      const end2 = parseInt(s2.endHour) * 60 + parseInt(s2.endMin);
      if (
        s1.meetingDay === s2.meetingDay &&
        ((start1 >= start2 && start1 < end2) || (end1 > start2 && end1 <= end2))
      )
        return true;
    }
  }
  return false;
};
/** Gets all possible (including invalid) `CombinedSimplifiedMeetingGrouping` from `meetings` and puts it in `result` */
const getMeetingCombinations = (
  meetings: CombinedSimplifiedMeeting[][],
  result: CombinedSimplifiedMeetingGrouping[],
  soFar: CombinedSimplifiedMeetingGrouping = [],
  index = 0
): void => {
  if (meetings.length === index) {
    if (soFar.length !== 0) {
      result.push([...soFar]);
    }
  } else {
    for (const item of meetings[index]) {
      soFar.push(item);
      getMeetingCombinations(meetings, result, soFar, index + 1);
      soFar.pop();
    }
  }
};
/** Creates all possible valid timetables from `meetings` puts it in `result` */
const getTermCombinations = (
  meetings: MeetingByActivity[][],
  result: Timetable[],
  soFar: Timetable,
  index: number = 0
): void => {
  if (meetings.length === index) {
    if (!soFar.isEmpty()) {
      result.push(soFar.copy());
    }
  } else {
    const groupings: CombinedSimplifiedMeetingGrouping[] = [];
    meetings[index].forEach((item) =>
      groupings.push(...getValidActivityGroupings(item))
    );
    groupings.forEach((group) => {
      const contents: TimetableContent[] = group.map((item) => ({
        allMeetings: item,
        simpleSchedule: item[0].simpleSchedule,
        courseCode: item[0].courseCode,
        section: item[0].section,
        deliveryMode: item[0].deliveryMode,
        id: uuidv4(),
      }));

      if (contents.every((content) => !soFar.checkOverlap(content))) {
        contents.forEach((content) => soFar.add(content));
        getTermCombinations(meetings, result, soFar, index + 1);
        contents.forEach((content) => soFar.remove(content));
      }
    });
  }
};

/**
 * @param courses all courses
 * @returns All possible valid timetables
 */
const getTimetables = (courses: SimplifiedCourses): Timetable[] => {
  const meetingsOfTerms = Object.keys(courses)
    .map((key) => courses[key])
    .filter((item) => !item.disabled)
    .map((item) =>
      item.terms.filter((t) => !t.disabled).map((t) => t.meetingsByActivity)
    );
  // terms is something like
  // [
  // [meetings for term F for course A, meetings for term S for course A],
  // [meetings for term Y for course B]
  // ]
  const res: Timetable[] = [];
  getTermCombinations(meetingsOfTerms, res, new Timetable());
  return res;
};
export default getTimetables;
