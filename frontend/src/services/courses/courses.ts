import axios from "axios";
import BadAxiosResponseError from "../helper";

export type Section = "F" | "S" | "Y";
export type TeachingMethod = "LEC" | "TUT" | "PRA";
export type DeliveryMode = "ONLSYNC" | "ONLASYNC" | "CLASS";
export type MeetingDay = "MO" | "TU" | "WE" | "TH" | "FR";
export interface Instructor {
  firstName: string;
  lastName: string;
}

export interface Schedule {
  meetingDay: MeetingDay;
  /** In format hh:mm, always half an hour interval*/
  meetingStartTime: string;
  /** In format hh:mm, always half an hour interval*/
  meetingEndTime: string;
}

export interface Meeting {
  /** Empty schedule for async or courses that don't have schedules (independent study courses) */
  schedule: Schedule[];
  instructors: Instructor[];
  teachingMethod: TeachingMethod;
  /** Something like 5101, 0102, 0102 */
  sectionNumber: string;
  deliveryMode: DeliveryMode;
  /** Async only hours per week */
  contactHours?: string;
}
export interface Course {
  courseTitle: string;
  code: string;
  section: Section;
  session: string;
  meetings: Meeting[];
  breadthCategories: string;
  distributionCategories: string;
  courseDescription: string;
  deliveryInstructions?: string;
  webTimetableInstructions?: string;
  prerequisite?: string;
  corequisite?: string;
  exclusion?: string;
  recommendedPreparation?: string;
}

export const getCourse = async (
  code: string,
  session: string
): Promise<Course[]> => {
  try {
    const res = (await axios.get<Course[]>(`/api/courses/${session}/${code}`))
      .data;
    res.map((item) => {
      if (item.deliveryInstructions)
        item.deliveryInstructions = getInnerTextWithoutHtml(
          item.deliveryInstructions
        );
      if (item.webTimetableInstructions)
        item.webTimetableInstructions = getInnerTextWithoutHtml(
          item.webTimetableInstructions
        );
      item.courseDescription = getInnerTextWithoutHtml(item.courseDescription);
      return item;
    });
    return res;
  } catch (err) {
    throw new BadAxiosResponseError(err.response);
  }
};
/**
 * Day of week to full names, converts time to 12 hour format instead of 24 hour
 */
export const getFormattedSchedule = (item: Schedule) => {
  const meetingDayToActual = {
    MO: "Monday",
    TU: "Tuesday",
    WE: "Wednesday",
    TH: "Thursday",
    FR: "Friday",
  };
  const [startHour, startMinute] = item.meetingStartTime.split(":");
  const [endHour, endMinute] = item.meetingEndTime.split(":");
  const startHourInt = parseInt(startHour);
  const endHourInt = parseInt(endHour);
  return {
    meetingDay: meetingDayToActual[item.meetingDay],
    meetingStartTime: `${
      startHourInt <= 12 ? startHourInt : startHourInt - 12
    }:${startMinute} ${startHourInt < 12 ? "A.M" : "P.M"}`,
    meetingEndTime: `${
      endHourInt <= 12 ? endHour : endHourInt - 12
    }:${endMinute} ${endHourInt < 12 ? "A.M" : "P.M"}`,
  };
};
const getInnerTextWithoutHtml = (txt: string) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = txt;
  return tmp.textContent || tmp.innerText || "";
};
