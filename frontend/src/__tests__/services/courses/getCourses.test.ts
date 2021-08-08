import config from "../../../config";
import { getCourse } from "../../../services/courses/courses";

/**
 * This ensures getCourse endpoint works
 */
describe("Getting courses from backend", () => {
  it("Getting CSC108", async () => {
    const data = await getCourse("CSC108", config.session);
    expect(data).toHaveLength(2);
  });
  it("Getting MAT237", async () => {
    const data = await getCourse("MAT237", config.session);
    expect(data).toHaveLength(1);
  });
  it("Getting ANT100", async () => {
    const data = await getCourse("ANT100", config.session);
    expect(data).toHaveLength(1);
  });
  it("Getting HPS100", async () => {
    const data = await getCourse("HPS100", config.session);
    expect(data).toHaveLength(2);
  });
});
