import { SimplifiedSchedule, TimetableContent } from "../helper";
import { v4 as uuidv4 } from "uuid";
import { DeliveryMode, Section } from "../getCourse";

/**
 * @param times dayOfWeek:hour:minute like 0:13:30 for Monday, 1:30 P.M
 */
const generateSimpleSchedule = (
  times: [string, string][]
): SimplifiedSchedule[] => {
  const dayToStr = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return times.map<SimplifiedSchedule>((time) => {
    const [startDate, startHour, startMin] = time[0].split(":");
    const [, endHour, endMin] = time[1].split(":");
    const intDay = parseInt(startDate) as 0 | 1 | 2 | 3 | 4;
    return {
      meetingDay: intDay,
      meetingDayStr: dayToStr[intDay] as "Mon" | "Tue" | "Wed" | "Thu" | "Fri",
      startHour,
      startMin,
      endHour,
      endMin,
    };
  });
};
/**
 * @param times dayOfWeek:hour:minute like 0:13:30 for Monday, 1:30 P.M
 */
export const generateContent = (
  times: [string, string][] = [["1:13:30", "1:14:30"]],
  delivery: DeliveryMode = "CLASS",
  section: Section = "F"
): TimetableContent => {
  return {
    allMeetings: [],
    simpleSchedule: generateSimpleSchedule(times),
    courseCode: "CSC108",
    section: section,
    deliveryMode: delivery,
    id: uuidv4(),
  };
};
