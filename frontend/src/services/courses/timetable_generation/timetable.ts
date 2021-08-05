import { SimplifiedSchedule, TimetableContent } from "./helper";

class Timetable {
  public first: (TimetableContent | null)[];
  public second: (TimetableContent | null)[];
  public async: {
    [id: string]: TimetableContent;
  };
  constructor() {
    // 24 hours per day * 2 (two half hours) * 5 (five days per week)
    // Courses go for 30 minute intervals
    this.first = Array(24 * 2 * 5).fill(null);
    this.second = Array(24 * 2 * 5).fill(null);
    this.async = {};
  }
  checkOverlap(content: TimetableContent): boolean {
    for (const time of content.simpleSchedule) {
      const [start, end] = timeToIndex(time);
      for (let i = start; i < end; i++) {
        if (
          ("FY".includes(content.section) && this.first[i] !== null) ||
          ("SY".includes(content.section) && this.second[i] !== null)
        )
          return true;
      }
    }
    return false;
  }
  add(content: TimetableContent): void {
    if (content.deliveryMode === "ONLASYNC") {
      if (content.id in this.async)
        throw new TimetableError(
          content,
          this,
          `Trying to add to timetable when slot is used`
        );
      else {
        this.async[content.id] = content;
      }
    } else {
      for (const time of content.simpleSchedule) {
        const [startI, endI] = timeToIndex(time);
        for (let i = startI; i < endI; i++) {
          if (
            ("FY".includes(content.section) && this.first[i] !== null) ||
            ("SY".includes(content.section) && this.second[i] !== null)
          ) {
            throw new TimetableError(
              content,
              this,
              `Trying to add to timetable when slot is used`
            );
          }
          if ("FY".includes(content.section)) this.first[i] = content;
          if ("SY".includes(content.section)) this.second[i] = content;
        }
      }
    }
  }
  remove(content: TimetableContent): void {
    if (content === null) return;
    else if (content.deliveryMode === "ONLASYNC") {
      if (!(content.id in this.async))
        throw new TimetableError(
          content,
          this,
          `Trying to remove from timetable when slot is empty`
        );
      else {
        delete this.async[content.id];
      }
    } else {
      for (const time of content.simpleSchedule) {
        const [startI, endI] = timeToIndex(time);
        for (let i = startI; i < endI; i++) {
          if (
            ("FY".includes(content.section) && this.first[i] === null) ||
            ("SY".includes(content.section) && this.second[i] === null)
          ) {
            throw new TimetableError(
              content,
              this,
              `Trying to remove from timetable when slot is empty`
            );
          }
          if ("FY".includes(content.section)) this.first[i] = null;
          if ("SY".includes(content.section)) this.second[i] = null;
        }
      }
    }
  }
  copy(): Timetable {
    const cpy = new Timetable();
    cpy.first = [...this.first];
    cpy.second = [...this.second];
    cpy.async = { ...this.async };
    return cpy;
  }
  isEmpty(): boolean {
    return (
      Object.keys(this.async).length === 0 &&
      this.first.every((item) => item === null) &&
      this.second.every((item) => item === null)
    );
  }
}

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
    timetable: Timetable,
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
export default Timetable;
