import Timetable from "../timetable";
import { generateContent } from "./helper";

describe("Timetable class methods", () => {
  it("Initialize timetable", () => {
    const timetable = new Timetable();
    expect(timetable.first).toHaveLength(240);
    expect(timetable.second).toHaveLength(240);
    expect(Object.keys(timetable.async)).toHaveLength(0);
    timetable.first.forEach((item) => expect(item).toBeNull());
    timetable.second.forEach((item) => expect(item).toBeNull());
  });
  it("Check overlap", () => {
    const timetable = new Timetable();
    const realContent = generateContent([["1:13:30", "1:14:30"]]);
    const conflictContent1 = generateContent([["1:13:30", "1:14:00"]]);
    const conflictContent2 = generateContent([["1:13:30", "1:14:30"]]);
    const conflictContent3 = generateContent([["1:13:00", "1:14:00"]]);
    const conflictContent4 = generateContent([["1:14:00", "1:15:00"]]);
    const conflictContent5 = generateContent(
      [["1:14:00", "1:15:00"]],
      "CLASS",
      "Y"
    );
    const conflictContent6 = generateContent(
      [["1:14:00", "1:15:00"]],
      "ONLSYNC"
    );
    const noConflict1 = generateContent([["1:13:00", "1:13:30"]]);
    const noConflict2 = generateContent([["1:14:30", "1:50:00"]]);
    const noConflict3 = generateContent([["1:14:30", "1:50:00"]], "CLASS", "S");
    const noConflict4 = generateContent([], "ONLASYNC", "Y");
    timetable.add(realContent);
    expect(timetable.checkOverlap(conflictContent1)).toBe(true);
    expect(timetable.checkOverlap(conflictContent2)).toBe(true);
    expect(timetable.checkOverlap(conflictContent3)).toBe(true);
    expect(timetable.checkOverlap(conflictContent4)).toBe(true);
    expect(timetable.checkOverlap(conflictContent5)).toBe(true);
    expect(timetable.checkOverlap(conflictContent6)).toBe(true);
    expect(timetable.checkOverlap(noConflict1)).toBe(false);
    expect(timetable.checkOverlap(noConflict2)).toBe(false);
    expect(timetable.checkOverlap(noConflict3)).toBe(false);
    expect(timetable.checkOverlap(noConflict4)).toBe(false);
  });
  it("Add to timetable", () => {
    const timetable = new Timetable();
    const content = generateContent([["1:13:30", "1:14:30"]]);
    const content2 = generateContent([["1:13:30", "1:14:30"]], "CLASS", "S");
    timetable.add(content);
    timetable.add(content2);
    expect(timetable.first[75]).not.toBeNull();
    expect(timetable.first[76]).not.toBeNull();
    expect(timetable.second[75]).not.toBeNull();
    expect(timetable.second[76]).not.toBeNull();
    expect(timetable.first.filter((item) => item !== null)).toHaveLength(2);
    expect(timetable.second.filter((item) => item !== null)).toHaveLength(2);
    const timetable2 = new Timetable();
    const content3 = generateContent([["1:13:30", "1:14:30"]], "CLASS", "Y");
    timetable2.add(content3);
    expect(timetable2.first[75]).not.toBeNull();
    expect(timetable2.first[76]).not.toBeNull();
    expect(timetable2.second[75]).not.toBeNull();
    expect(timetable2.second[76]).not.toBeNull();
    expect(timetable2.first.filter((item) => item !== null)).toHaveLength(2);
    expect(timetable2.second.filter((item) => item !== null)).toHaveLength(2);
    timetable2.add(generateContent([], "ONLASYNC"));
    expect(Object.keys(timetable2.async)).toHaveLength(1);
    const content4 = generateContent([["1:13:30", "1:14:30"]], "CLASS", "Y");
    expect(() => timetable2.add(content4)).toThrowError();
  });
  it("Remove from timetable", () => {
    const timetable = new Timetable();
    const content = generateContent([["1:13:30", "1:14:30"]]);
    const content2 = generateContent([["1:13:30", "1:14:30"]], "ONLSYNC", "S");
    const content3 = generateContent([["1:13:30", "1:14:30"]], "ONLSYNC", "Y");
    expect(() => timetable.remove(content)).toThrowError();
    timetable.add(content);
    timetable.remove(content);
    expect(timetable.first.filter((item) => item !== null)).toHaveLength(0);
    expect(timetable.second.filter((item) => item !== null)).toHaveLength(0);
    timetable.add(content2);
    timetable.remove(content2);
    expect(timetable.first.filter((item) => item !== null)).toHaveLength(0);
    expect(timetable.second.filter((item) => item !== null)).toHaveLength(0);
    timetable.add(content3);
    timetable.remove(content3);
    expect(timetable.first.filter((item) => item !== null)).toHaveLength(0);
    expect(timetable.second.filter((item) => item !== null)).toHaveLength(0);
    expect(Object.keys(timetable.async)).toHaveLength(0);
    const content4 = generateContent([], "ONLASYNC", "Y");
    timetable.add(content4);
    timetable.remove(content4);
    expect(Object.keys(timetable.async)).toHaveLength(0);
  });
  it("Copy from timetable", () => {
    const timetable = new Timetable();
    const content = generateContent([["0:00:00", "0:00:30"]], "ONLSYNC", "Y");
    const content2 = generateContent([], "ONLASYNC", "Y");
    timetable.add(content);
    timetable.add(content2);
    const cpy = timetable.copy();
    timetable.remove(content);
    timetable.remove(content2);
    expect(cpy.first.filter((item) => item !== null)).toHaveLength(1);
    expect(cpy.second.filter((item) => item !== null)).toHaveLength(1);
    expect(Object.keys(cpy.async)).toHaveLength(1);
  });
  it("Timetable is empty", () => {
    const timetable = new Timetable();
    const content = generateContent([["0:00:00", "0:00:30"]], "ONLSYNC", "Y");
    const content2 = generateContent([], "ONLASYNC", "Y");
    expect(timetable.isEmpty()).toBe(true);
    timetable.add(content);
    expect(timetable.isEmpty()).toBe(false);
    timetable.remove(content);
    expect(timetable.isEmpty()).toBe(true);
    timetable.add(content2);
    expect(timetable.isEmpty()).toBe(false);
    timetable.remove(content2);
    expect(timetable.isEmpty()).toBe(true);
  });
});
