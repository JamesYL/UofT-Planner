import { makeStyles, Theme, createTheme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  searchBar: {
    margin: 10,
    maxWidth: 600,
    width: "100%",
  },
  header: {
    display: "flex",
    margin: 10,
    justifyContent: "flex-start",
  },
  import: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.palette.text.primary,
    margin: 10,
  },
  fab: {
    position: "fixed",
    right: theme.spacing(5),
    bottom: theme.spacing(5),
    background: "transparent",
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    borderStyle: "solid",
    color: theme.palette.text.primary,
    "&:hover": {
      background: theme.palette.background.paper,
    },
  },
  helpIcon: {
    marginRight: theme.spacing(1),
  },
  addMoreScroll: {
    height: 100,
    width: "100%",
  },
}));
export const getTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
        md: 900,
        lg: 1300,
        xl: 1600,
      },
    },
  });
export default useStyles;
