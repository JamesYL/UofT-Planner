import { makeStyles, Theme, createTheme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  optionsBar: {
    display: "flex",
    marginTop: 15,
    marginBottom: 15,
  },
  divider: {
    flexGrow: 1,
  },
  termChooserButton: {
    borderColor: theme.palette.text.primary,
    borderWidth: 3,
    transition: "none",
    marginLeft: 20,
    marginRight: 20,
  },
}));
export const getTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1600, // only one changed
        xl: 1920,
      },
    },
  });
export default useStyles;
