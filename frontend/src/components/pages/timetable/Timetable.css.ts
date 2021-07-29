import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 600,
    width: "100%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 7px rgba(0, 0, 0, 0.5)`,
      borderRadius: 50,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "darkgrey",
      borderRadius: 50,
    },
    display: "inline-block",
  },
  table: {
    position: "sticky",
    width: "100%",
    borderSpacing: 0,
    background: theme.palette.background.paper,
    userSelect: "none",
  },
  titleCell: {
    textAlign: "left",
    verticalAlign: "center",
    width: "9%",
    padding: 10,
    color: theme.palette.text.primary,
  },
  dayOfWeekCell: {
    textAlign: "left",
    verticalAlign: "top",
    width: "18.2%",
    fontWeight: "normal",
    paddingBottom: 10,
    color: theme.palette.text.secondary,
    paddingTop: 10,
  },
  timeCell: {
    verticalAlign: "top",
    textAlign: "left",
    paddingBottom: 60,
    position: "relative",
    paddingLeft: 10,
  },
  dataCell: {
    borderTop: "1px solid",
    borderColor: theme.palette.text.secondary,
    position: "relative",
  },
  timeCellTime: {
    display: "inline-block",
  },
  timeCellAMPM: {
    display: "inline-block",
  },
  timeCellText: {
    position: "absolute",
    top: -15,
    color: theme.palette.text.secondary,
  },
  eventText: {
    color: "white",
    textShadow: `-1px -1px 0 black, 
        1px -1px 0 black, 
        -1px 1px 0 black, 
        1px 1px 0 black`,
  },
}));
export default useStyles;
