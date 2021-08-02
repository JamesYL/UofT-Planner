import { FullTimetable, TimetableContent } from "./helper";
import { Schedule } from "../courses";

export const createEmptyTimetable = (): FullTimetable => {
  // 24 hours per day * 2 (two half hours) * 5 (five days per week)
  // Courses go for 30 minute intervals
  return {
    first: Array(24 * 2 * 5).fill(null),
    second: Array(24 * 2 * 5).fill(null),
    async: {},
  };
};
export const checkOverlap = (
  timetable: FullTimetable,
  content: TimetableContent
): boolean => {
  for (const time of content.meeting.schedule) {
    const [start, end] = timeToIndex(time);
    for (let i = start; i < end; i++) {
      if (
        ("FY".includes(content.term.section) && timetable.first[i] !== null) ||
        ("SY".includes(content.term.section) && timetable.second[i] !== null)
      )
        return true;
    }
  }
  return false;
};
export const addToTimetable = (
  timetable: FullTimetable,
  content: TimetableContent
): void => {
  if (content.meeting.deliveryMode === "ONLASYNC") {
    if (content.id in timetable.async)
      throw new TimetableError(
        content,
        timetable,
        `Trying to add to timetable when slot is used`
      );
    else {
      timetable.async[content.id] = content;
    }
  } else {
    for (const time of content.meeting.schedule) {
      const [startI, endI] = timeToIndex(time);
      for (let i = startI; i < endI; i++) {
        if (
          ("FY".includes(content.term.section) &&
            timetable.first[i] !== null) ||
          ("SY".includes(content.term.section) && timetable.second[i] !== null)
        ) {
          throw new TimetableError(
            content,
            timetable,
            `Trying to add to timetable when slot is used`
          );
        }
        if ("FY".includes(content.term.section)) timetable.first[i] = content;
        if ("SY".includes(content.term.section)) timetable.second[i] = content;
      }
    }
  }
};
export const removeFromTimetable = (
  timetable: FullTimetable,
  content: TimetableContent
): void => {
  if (content === null) return;
  else if (content.meeting.deliveryMode === "ONLASYNC") {
    if (!(content.id in timetable.async))
      throw new TimetableError(
        content,
        timetable,
        `Trying to remove from timetable when slot is empty`
      );
    else {
      delete timetable.async[content.id];
    }
  } else {
    for (const time of content.meeting.schedule) {
      const [startI, endI] = timeToIndex(time);
      for (let i = startI; i < endI; i++) {
        if (
          ("FY".includes(content.term.section) &&
            timetable.first[i] === null) ||
          ("SY".includes(content.term.section) && timetable.second[i] === null)
        ) {
          throw new TimetableError(
            content,
            timetable,
            `Trying to remove from timetable when slot is empty`
          );
        }
        if ("FY".includes(content.term.section)) timetable.first[i] = null;
        if ("SY".includes(content.term.section)) timetable.second[i] = null;
      }
    }
  }
};

const timeToIndex = (t: Schedule): [number, number] => {
  const dayOfWeekIndex = {
    MO: 0,
    TU: 48,
    WE: 96,
    TH: 144,
    FR: 192,
  }[t.meetingDay];
  const [startHour, startMin] = t.meetingStartTime.split(":");
  const [endHour, endMin] = t.meetingEndTime.split(":");
  const startI =
    dayOfWeekIndex + parseInt(startHour) * 2 + parseInt(startMin) / 30;
  const endI = dayOfWeekIndex + parseInt(endHour) * 2 + parseInt(endMin);
  return [startI, endI];
};
export class TimetableError extends Error {
  private content;
  private timetable;
  constructor(
    content: TimetableContent,
    timetable: FullTimetable,
    message: string
  ) {
    super(message);
    this.content = content;
    this.timetable = timetable;
  }
  getContent() {
    return this.content;
  }
  getTimetable() {
    return this.timetable;
  }
}
