import { Meeting, Course } from "../courses";
export interface SimplifiedCourses {
  /** Code must be length 6, Something like CSC108, NOT CSC108H1 */
  [courseCode: string]: SimplifiedTerm[];
}
export interface SimplifiedTerm extends Course {
  meetingsByActivity: MeetingByActivity;
}
export interface MeetingByActivity {
  LEC: Meeting[];
  TUT: Meeting[];
  PRA: Meeting[];
}
export type teachingMethod = "LEC" | "TUT" | "PRA";
