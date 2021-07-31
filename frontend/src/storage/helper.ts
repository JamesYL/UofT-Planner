export const setValIfNotExist = (key: string, val: any) => {
  const tmp = localStorage.getItem(key);
  if (tmp === null) localStorage.setItem(key, JSON.stringify(val));
};
/** Change current website version to reset settings that are version dependent */
export const CURR_WEBSITE_VERSION = "1";
export const WEBSITE_VERSION = "WEBSITE_VERSION";

// Version dependent
export const IMPORTED_COURSES_PAGE_VISITED = "IMPORTED_COURSES_PAGE_VISITED";

// Not version dependent
export const DARK_MODE_KEY = "IS_DARK_MODE";
