import { makeStyles, Theme, createTheme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {
    padding: 16,
    paddingBottom: 0,
  },
  classAction: {
    padding: 16,
  },
  deleteSection: {
    padding: 0,
  },
  card: {
    background: theme.palette.background.default,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  courseSelectionTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
  },
  deleteCourseSectionButton: {
    marginRight: theme.spacing(3),
    borderColor: theme.palette.error.main,
    borderWidth: 2,
  },
  expanded: {
    "&$expanded": {
      margin: 10,
    },
  },
  accordion: {
    margin: 10,
  },
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
    background: theme.palette.info.main,
    borderWidth: 2,
    color: theme.palette.common.white,
    margin: 10,
    borderRadius: 10,
    "&:hover": {
      background: theme.palette.info.light,
    },
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
