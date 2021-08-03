import { Meeting, Course, Section } from "./../courses";
export interface SimplifiedCourses {
  /** Code must be length 6, Something like CSC108, NOT CSC108H1 */
  [courseCode: string]: { disabled: boolean; terms: SimplifiedTerm[] };
}
export interface SimplifiedTerm extends Omit<Course, "meetings"> {
  meetingsByActivity: MeetingByActivity;
  disabled: boolean;
}
export interface MeetingByActivity {
  LEC: SimplifiedMeeting[];
  TUT: SimplifiedMeeting[];
  PRA: SimplifiedMeeting[];
}
export interface SimplifiedMeeting extends Omit<Meeting, "schedule"> {
  disabled: boolean;
  id: string;
  courseCode: string;
  section: Section;
  simpleSchedule: SimplifiedSchedule[];
}
export interface SimplifiedSchedule {
  meetingDay: 0 | 1 | 2 | 3 | 4;
  meetingDayStr: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
}
/** Meetings that share the same schedules */
export type CombinedSimplifiedMeeting = SimplifiedMeeting[];
export interface TimetableContent extends SimplifiedMeeting {}

export interface FullTimetable {
  first: (TimetableContent | null)[];
  second: (TimetableContent | null)[];
  async: {
    [id: string]: TimetableContent;
  };
}
