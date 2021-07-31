const defaultStorage: StorageItems = {
  lastWebsiteVersion: 0,
  importCoursesPageVisited: false,
  isDarkMode: true,
};
export interface StorageItems {
  lastWebsiteVersion: number;
  importCoursesPageVisited: boolean;
  isDarkMode: boolean;
}
export default defaultStorage;
