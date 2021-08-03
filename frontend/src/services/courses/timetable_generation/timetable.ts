import { FullTimetable, SimplifiedSchedule, TimetableContent } from "./helper";

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
  for (const time of content.simpleSchedule) {
    const [start, end] = timeToIndex(time);
    for (let i = start; i < end; i++) {
      if (
        ("FY".includes(content.section) && timetable.first[i] !== null) ||
        ("SY".includes(content.section) && timetable.second[i] !== null)
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
  if (content.deliveryMode === "ONLASYNC") {
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
    for (const time of content.simpleSchedule) {
      const [startI, endI] = timeToIndex(time);
      for (let i = startI; i < endI; i++) {
        if (
          ("FY".includes(content.section) && timetable.first[i] !== null) ||
          ("SY".includes(content.section) && timetable.second[i] !== null)
        ) {
          throw new TimetableError(
            content,
            timetable,
            `Trying to add to timetable when slot is used`
          );
        }
        if ("FY".includes(content.section)) timetable.first[i] = content;
        if ("SY".includes(content.section)) timetable.second[i] = content;
      }
    }
  }
};
export const removeFromTimetable = (
  timetable: FullTimetable,
  content: TimetableContent
): void => {
  if (content === null) return;
  else if (content.deliveryMode === "ONLASYNC") {
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
    for (const time of content.simpleSchedule) {
      const [startI, endI] = timeToIndex(time);
      for (let i = startI; i < endI; i++) {
        if (
          ("FY".includes(content.section) && timetable.first[i] === null) ||
          ("SY".includes(content.section) && timetable.second[i] === null)
        ) {
          throw new TimetableError(
            content,
            timetable,
            `Trying to remove from timetable when slot is empty`
          );
        }
        if ("FY".includes(content.section)) timetable.first[i] = null;
        if ("SY".includes(content.section)) timetable.second[i] = null;
      }
    }
  }
};

const timeToIndex = (t: SimplifiedSchedule): [number, number] => {
  const dayIndex = t.meetingDay * 48;
  const startI =
    t.meetingDay * 48 -
    48 +
    parseInt(t.startHour) * 2 +
    ~~(parseInt(t.startMin) / 30);
  const endI = dayIndex + parseInt(t.endHour) * 2 + ~~(parseInt(t.endMin) / 30);
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
