import Timetable from "./timetable";

/**
 * Sorts timetable in place by least wasted time (commute time + time between classes)
 * @param commute Time in minutes spent commute both ways
 * @param timetables All timetables
 * @returns Sorted timetables
 */
export const sortTimetableByMinimalTimeWasted = (
  commute: number,
  timetables: Timetable[]
): Timetable[] =>
  timetables.sort((a, b) => {
    const totalA =
      getTotalTimeWasted(commute, a, "F") + getTotalTimeWasted(commute, a, "S");
    const totalB =
      getTotalTimeWasted(commute, b, "F") + getTotalTimeWasted(commute, b, "S");
    return totalA < totalB ? -1 : totalA > totalB ? 1 : 0;
  });

/** Time wasted in half hours */
const getTotalTimeWasted = (
  commute: number,
  timetable: Timetable,
  term: "F" | "S"
): number => {
  const curr = term === "F" ? timetable.first : timetable.second;
  let total = 0;
  for (let weekDay = 0; weekDay <= 4; weekDay++) {
    const startIndex = weekDay * 48;
    const daySchedule = curr.slice(startIndex, startIndex + 48);
    if (
      daySchedule.every(
        (item) => item === null || item.deliveryMode !== "CLASS"
      )
    ) {
      // If every class for a weekday is online synchronous, then time wasted is irrelevant
      continue;
    } else {
      // Only count time wasted from first in class item to last in class item
      let firstInClassIndex: number = -1;
      let lastInClassIndex: number = -1;
      daySchedule.forEach((item, index) => {
        if (item !== null && item.deliveryMode === "CLASS") {
          if (firstInClassIndex === -1) firstInClassIndex = index;
          lastInClassIndex = index;
        }
      });
      const totEmptyClasses = daySchedule
        .slice(firstInClassIndex + 1, lastInClassIndex)
        .filter((item) => item === null).length;
      total += totEmptyClasses + commute / 30;
    }
  }
  return total;
};
