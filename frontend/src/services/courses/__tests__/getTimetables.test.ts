import getTimetables from "../getTimetables";
import hps100 from "./data/hps100.json";
import simple1 from "./data/simple-example1.json";
import simple2 from "./data/simple-example2.json";
import simple3 from "./data/simple-example3.json";
import simplifyCourses from "../simplifyCourses";
import { Course } from "../getCourse";
describe("Getting all timetables", () => {
  it("Single course with sync and async", () => {
    const timetables = getTimetables(simplifyCourses(hps100 as Course[]));
    expect(timetables).toHaveLength(16);
  });
  it("Two courses with conflict", () => {
    const timetables = getTimetables(
      simplifyCourses([...simple1, ...simple2] as Course[])
    );
    expect(timetables).toHaveLength(1);
  });
  it("Single course with duplicate times", () => {
    const timetables = getTimetables(simplifyCourses(simple3 as Course[]));
    expect(timetables).toHaveLength(2);
  });
});
