import getTimetables from "../getTimetables";
import hps100 from "./data/hps100.json";
import simplifyCourses from "../simplifyCourses";
import { Course } from "../getCourse";
describe("Find minimal timetable", () => {
  it("Single course with sync and async", () => {
    // const timetables = getTimetables(simplifyCourses(hps100 as Course[]));
    // expect(timetables).toHaveLength(16);
  });
});
