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
