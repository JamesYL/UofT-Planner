import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      overflow: "auto",
    },
    table: {
      position: "sticky",
      width: "100%",
      borderSpacing: 0,
    },
    titleCell: {
      textAlign: "left",
      verticalAlign: "bottom",
      padding: 0,
      width: "8%",
      paddingBottom: 30,
    },
    dayOfWeekCell: {
      textAlign: "left",
      verticalAlign: "top",
      width: "18.4%",
      color: "gray",
      fontWeight: "normal",
      paddingBottom: 10,
    },
    timeCell: {
      verticalAlign: "top",
      textAlign: "left",
      paddingBottom: 60,
      position: "relative",
    },
    dataCell: {
      borderTop: "1px solid",
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
    },
  })
);
