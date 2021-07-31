import {
  DARK_MODE_KEY,
  IMPORTED_COURSES_PAGE_VISITED,
  WEBSITE_VERSION,
  setValIfNotExist,
  CURR_WEBSITE_VERSION,
} from "./helper";
import React from "react";

// Setup
(() => {
  setValIfNotExist(DARK_MODE_KEY, true);
  setValIfNotExist(IMPORTED_COURSES_PAGE_VISITED, false);

  const websiteVersion = localStorage.getItem(WEBSITE_VERSION);
  if (websiteVersion !== CURR_WEBSITE_VERSION) {
    localStorage.setItem(WEBSITE_VERSION, CURR_WEBSITE_VERSION);
    localStorage.setItem(IMPORTED_COURSES_PAGE_VISITED, "false");
  }
})();

export type UseStateReturnType = [boolean, (val: boolean) => unknown];
export const useDarkMode = (): UseStateReturnType => {
  const [isDark, setDark] = React.useState<boolean>(
    JSON.parse(localStorage.getItem(DARK_MODE_KEY) as string)
  );
  return [
    isDark,
    (val: boolean) => {
      setDark(val);
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(val));
    },
  ];
};

export type VisitedPages = typeof IMPORTED_COURSES_PAGE_VISITED;
export const usePageVisited = (props: {
  page: VisitedPages;
}): UseStateReturnType => {
  const { page } = props;
  const [visited, setVisited] = React.useState<boolean>(
    JSON.parse(localStorage.getItem(page) as string)
  );
  return [
    visited,
    (val: boolean) => {
      setVisited(val);
      localStorage.setItem(page, `${val}`);
    },
  ];
};
