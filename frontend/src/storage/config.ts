import { SimplifiedCourses } from "./../services/courses/timetable_generation/helper";
const defaultStorage: StorageItems = {
  lastWebsiteVersion: 0,
  importCoursesPageVisited: false,
  isDarkMode: true,
  courses: {},
  viewCoursesPageVisited: false,
};
export interface StorageItems {
  lastWebsiteVersion: number;
  importCoursesPageVisited: boolean;
  isDarkMode: boolean;
  courses: SimplifiedCourses;
  viewCoursesPageVisited: boolean;
}
export default defaultStorage;
