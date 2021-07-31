import { Course } from "./../../../backend/src/services/getCourses";
const defaultStorage: StorageItems = {
  lastWebsiteVersion: 0,
  importCoursesPageVisited: false,
  isDarkMode: true,
  courses: [],
};
export interface StorageItems {
  lastWebsiteVersion: number;
  importCoursesPageVisited: boolean;
  isDarkMode: boolean;
  courses: Course[];
}
export default defaultStorage;
