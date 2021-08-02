import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  courseSelectionTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    margin: theme.spacing(1),
    background: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
}));

export default useStyles;
