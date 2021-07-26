import axios from "axios";
interface ScheduleRawData {
  [meetingId: string]: {
    meetingDay: "MO" | "TU" | "WE" | "TH" | "FR" | null;
    /** In format hh:mm, always half an hour interval*/
    meetingStartTime: string | null;
    /** In format hh:mm, always half an hour interval*/
    meetingEndTime: string | null;
  };
}
interface InstructorRawData {
  [instructorId: string]: {
    firstName: string;
    lastName: string;
  };
}
interface MeetingRawData {
  schedule: ScheduleRawData | [];
  instructors: InstructorRawData | [];
  teachingMethod: "LEC" | "TUT" | "PRA";
  /** Something like 5101, 0102, 0102 */
  sectionNumber: string;
  deliveryMode: "ONLSYNC" | "ONLASYNC" | "CLASS";
  /** Async only hours per week */
  contactHours?: string;
  /** If this meeting still exists */
  cancel: string;
}
interface CourseRawData {
  [courseId: string]: {
    courseTitle: string;
    code: string;
    section: "F" | "S" | "Y";
    session: string;
    meetings: { [meetingId: string]: MeetingRawData };
    deliveryInstructions: string | null;
    breadthCategories: string;
    distributionCategories: string;
    courseDescription: string;
    prerequisite: string;
    corequisite: string;
    exclusion: string;
    recommendedPreparation: string;
  };
}
export interface Instructor {
  firstName: string;
  lastName: string;
}
export interface Schedule {
  meetingDay: "MO" | "TU" | "WE" | "TH" | "FR";
  /** In format hh:mm, always half an hour interval*/
  meetingStartTime: string;
  /** In format hh:mm, always half an hour interval*/
  meetingEndTime: string;
}
export interface Meeting {
  /** Empty schedule for async or courses that don't have schedules (independent study courses) */
  schedule: Schedule[];
  instructors: Instructor[];
  teachingMethod: "LEC" | "TUT" | "PRA";
  /** Something like 5101, 0102, 0102 */
  sectionNumber: string;
  deliveryMode: "ONLSYNC" | "ONLASYNC" | "CLASS";
  /** Async only hours per week */
  contactHours?: string;
}
export interface Course {
  courseTitle: string;
  code: string;
  section: "F" | "S" | "Y";
  session: string;
  meetings: Meeting[];
  breadthCategories: string;
  distributionCategories: string;
  courseDescription: string;
  deliveryInstructions?: string;
  prerequisite?: string;
  corequisite?: string;
  exclusion?: string;
  recommendedPreparation?: string;
}

export const getCourse = async (
  code: string,
  session: string
): Promise<Course[]> => {
  const rawCourses = (
    await axios.get(
      `https://timetable.iit.artsci.utoronto.ca/api/${session}/courses?code=${code}`
    )
  ).data as CourseRawData | [];
  if (Array.isArray(rawCourses)) return [];
  const parsedCourses: Course[] = [];
  for (const courseId in rawCourses) {
    const rawCourse = rawCourses[courseId];
    const {
      courseTitle,
      code,
      section,
      session,
      breadthCategories,
      distributionCategories,
      deliveryInstructions,
      courseDescription,
      prerequisite,
      corequisite,
      exclusion,
      recommendedPreparation,
    } = rawCourse;
    const meetings: Meeting[] = [];
    for (const meetingId in rawCourse.meetings) {
      const meeting = rawCourse.meetings[meetingId];
      if (meeting.cancel) continue;
      const { teachingMethod, sectionNumber, deliveryMode } = meeting;
      const schedule: Schedule[] = [];
      const instructors: Instructor[] = [];
      if (!Array.isArray(meeting.instructors))
        for (const instructorId in meeting.instructors) {
          const { firstName, lastName } = meeting.instructors[instructorId];
          instructors.push({ firstName, lastName });
        }
      if (!Array.isArray(meeting.schedule)) {
        for (const scheduleId in meeting.schedule) {
          const { meetingDay, meetingStartTime, meetingEndTime } =
            meeting.schedule[scheduleId];
          if (
            meetingDay !== null &&
            meetingStartTime !== null &&
            meetingEndTime !== null
          )
            schedule.push({ meetingDay, meetingStartTime, meetingEndTime });
        }
      }
      meetings.push({
        schedule,
        instructors,
        teachingMethod,
        sectionNumber,
        deliveryMode,
        contactHours: meeting.contactHours,
      });
    }
    parsedCourses.push({
      courseTitle,
      code,
      section,
      session,
      meetings,
      breadthCategories,
      distributionCategories,
      deliveryInstructions:
        deliveryInstructions === null ? undefined : deliveryInstructions,
      courseDescription,
      prerequisite: prerequisite === "" ? undefined : prerequisite,
      corequisite: corequisite === "" ? undefined : corequisite,
      exclusion: exclusion === "" ? undefined : exclusion,
      recommendedPreparation:
        recommendedPreparation === "" ? undefined : recommendedPreparation,
    });
  }
  return parsedCourses;
};
