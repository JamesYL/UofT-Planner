import { sortTimetableByMinimalTimeWasted } from "../findMinimalTimetable";
import Timetable from "../timetable";
import { generateContent } from "./helper";

const classContent = generateContent([], "CLASS");
const onlineSyncContent = generateContent([], "ONLSYNC");

describe("Find minimal timetable", () => {
  it("Fall term only no commute", () => {
    const t1 = new Timetable();
    const t2 = new Timetable();
    const t3 = new Timetable();
    t1.first[16] = classContent;
    t1.first[20] = classContent;
    t2.first[49] = classContent;
    t2.first[51] = classContent;
    t3.first[220] = classContent;
    t3.first[230] = classContent;
    const sorted = sortTimetableByMinimalTimeWasted(0, [t1, t2, t3]);
    expect(sorted).toStrictEqual([t2, t1, t3]);
  });
  it("Both terms no commute", () => {
    const t1 = new Timetable();
    const t2 = new Timetable();
    const t3 = new Timetable();
    t1.first[16] = classContent;
    t1.first[20] = classContent;
    t2.first[49] = classContent;
    t2.first[51] = classContent;
    t2.second[220] = classContent;
    t2.second[230] = classContent;
    t3.first[220] = classContent;
    t3.first[230] = classContent;
    const sorted = sortTimetableByMinimalTimeWasted(0, [t1, t2, t3]);
    expect(sorted).toStrictEqual([t1, t3, t2]);
  });
  it("Online sync time wasted near ends are ignored", () => {
    const t1 = new Timetable();
    const t2 = new Timetable();
    t1.first[0] = onlineSyncContent;
    t1.first[20] = classContent;
    t2.first[49] = classContent;
    t2.first[51] = classContent;
    let sorted = sortTimetableByMinimalTimeWasted(0, [t1, t2]);
    expect(sorted).toStrictEqual([t1, t2]);
    t1.first[0] = null;
    t1.first[40] = onlineSyncContent;
    sorted = sortTimetableByMinimalTimeWasted(0, [t1, t2]);
    expect(sorted).toStrictEqual([t1, t2]);
  });
  it("Include commute time", () => {
    const t1 = new Timetable();
    const t2 = new Timetable();
    t1.first[0] = classContent;
    t1.first[5] = classContent;
    t2.first[0] = classContent;
    t2.first[50] = classContent;
    let sorted = sortTimetableByMinimalTimeWasted(200, [t2, t1]);
    expect(sorted).toStrictEqual([t1, t2]);
  });
});
