import { createTheme } from "@material-ui/core";

export const theme = (dark: boolean) =>
  createTheme({
    palette: {
      type: dark ? "dark" : "light",
      background: {
        paper: dark ? "#424242" : "#E8E8E8",
        default: dark ? "#303030" : "#edf0f2",
      },
      primary: { main: "#002a5c", light: "#24c7e0" },
    },
  });
