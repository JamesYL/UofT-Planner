import { Switch } from "@material-ui/core";
import React from "react";
import { DarkMode } from "../../storage/settings";
interface NavProps {
  darkMode: DarkMode;
}
const Nav = (props: NavProps) => {
  const { darkMode } = props;
  return (
    <div>
      dark mode
      <Switch
        checked={darkMode.isDark}
        onChange={() => darkMode.setDark(!darkMode.isDark)}
      />
    </div>
  );
};
export default Nav;
