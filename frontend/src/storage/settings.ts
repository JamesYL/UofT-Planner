import React from "react";

const DARK_MODE_KEY = "IS_DARK_MODE";
const setup = () => {
  const dark = localStorage.getItem(DARK_MODE_KEY);
  if (dark === null) localStorage.setItem(DARK_MODE_KEY, JSON.stringify(false));
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
setup();
