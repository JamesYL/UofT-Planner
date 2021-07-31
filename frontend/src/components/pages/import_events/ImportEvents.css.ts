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
    background: theme.palette.success.main,
    borderWidth: 2,
    color: theme.palette.common.white,
    margin: 10,
    borderRadius: 10,
    "&:hover": {
      background: theme.palette.success.light,
    },
  },
  fab: {
    position: "fixed",
    right: theme.spacing(5),
    bottom: theme.spacing(5),
    background: theme.palette.info.main,
    "&:hover": {
      background: theme.palette.info.main,
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
