import getTimetables from "../../../services/courses/timetable_generation/getTimetables";
import hps100 from "./data/hps100.json";
import simple1 from "./data/simple-example1.json";
import simple2 from "./data/simple-example2.json";
import simplifyCourses from "../../../services/courses/timetable_generation/simplifyCourses";
import { Course } from "../../../services/courses/getCourse";
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
});
