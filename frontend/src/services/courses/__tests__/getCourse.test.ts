import config from "../../../config";
import { getCourse } from "../getCourse";

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
  it("Course code doesn't exist", async () => {
    await expect(getCourse("LLLLLL", config.session)).rejects.toThrow();
  });
  it("Course code too long", async () => {
    await expect(getCourse("HPS100000", config.session)).rejects.toThrow();
  });
  it("Course code too short", async () => {
    await expect(getCourse("HPS", config.session)).rejects.toThrow();
  });
});
