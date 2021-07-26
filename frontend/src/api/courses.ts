import axios from "axios";
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
  const res = (await axios.get(`/api/courses/${session}/${code}`))
    .data as Course[];
  res.forEach((item) => {
    if (item.deliveryInstructions)
      item.deliveryInstructions = getInnerTextWithoutHtml(
        item.deliveryInstructions
      );
    item.courseDescription = getInnerTextWithoutHtml(item.courseDescription);
  });

  return res;
};
const getInnerTextWithoutHtml = (txt: string) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = txt;
  return tmp.textContent || tmp.innerText || "";
};
