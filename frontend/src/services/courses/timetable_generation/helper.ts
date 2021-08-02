import { Section } from './../courses';
import { Meeting, Course } from "../courses";
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
export interface SimplifiedMeeting extends Meeting {
  disabled: boolean;
  id: string;
  courseCode: string;
  section: Section;
}
export interface TimetableContent {
  term: SimplifiedTerm;
  meeting: SimplifiedMeeting;
  id: string;
}

export interface FullTimetable {
  first: (TimetableContent | null)[];
  second: (TimetableContent | null)[];
  async: {
    [id: string]: TimetableContent;
  };
}
