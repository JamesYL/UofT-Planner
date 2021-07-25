import { createTheme } from "@material-ui/core";

export const theme = (dark: boolean) =>
  createTheme({
    palette: {
      type: dark ? "dark" : "light",
    },
  });
