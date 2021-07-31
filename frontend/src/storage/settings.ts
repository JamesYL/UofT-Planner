import React from "react";

/** Change this to reset settings that are version dependent */
const CURR_WEBSITE_VERSION = "1";

const DARK_MODE_KEY = "IS_DARK_MODE";
const WEBSITE_VERSION = "WEBSITE_VERSION";

export const IMPORTED_COURSES_PAGE_VISITED = "IMPORTED_COURSES_PAGE_VISITED";
export type VisitedPages = typeof IMPORTED_COURSES_PAGE_VISITED;

const setup = () => {
  setValIfNotExist(DARK_MODE_KEY, true);
  setValIfNotExist(IMPORTED_COURSES_PAGE_VISITED, false);

  const websiteVersion = localStorage.getItem(WEBSITE_VERSION);
  if (websiteVersion !== CURR_WEBSITE_VERSION) {
    localStorage.setItem(WEBSITE_VERSION, CURR_WEBSITE_VERSION);
    localStorage.setItem(IMPORTED_COURSES_PAGE_VISITED, "false");
  }
};
const setValIfNotExist = (key: string, val: any) => {
  const tmp = localStorage.getItem(key);
  if (tmp === null) localStorage.setItem(key, JSON.stringify(val));
};
export interface DarkMode {
  isDark: boolean;
  setDark: (val: boolean) => void;
}
export const useDarkMode = (): DarkMode => {
  const [isDark, setDark] = React.useState<boolean>(
    JSON.parse(localStorage.getItem(DARK_MODE_KEY) as string)
  );
  return {
    isDark,
    setDark: (val: boolean) => {
      setDark(val);
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(val));
    },
  };
};
export interface PageVisited {
  visited: boolean;
  setVisited: () => unknown;
}
export const usePageVisited = (props: { page: VisitedPages }): PageVisited => {
  const { page } = props;
  const [visited, setVisited] = React.useState<boolean>(
    JSON.parse(localStorage.getItem(page) as string)
  );
  return {
    visited,
    setVisited: () => {
      setVisited(true);
      localStorage.setItem(page, "true");
    },
  };
};
setup();
