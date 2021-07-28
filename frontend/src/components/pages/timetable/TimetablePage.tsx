import { Button, Grid, MuiThemeProvider, useTheme } from "@material-ui/core";
import React from "react";
import useStyles, { getTheme } from "./TimetablePage.css";
import Timetable from "./Timetable";
import { TimetableProp } from "./Timetable.types";

const tmpTimetable1 = {
  dayStart: 8,
  dayEnd: 22,
  title: "First",
  allEvents: [
    {
      dayOfWeek: 3,
      start: { hour: 11, minute: 15 },
      end: { hour: 13, minute: 45 },
      background: "red",
      text: "CSC222",
    },
    {
      dayOfWeek: 3,
      start: { hour: 12, minute: 45 },
      end: { hour: 15, minute: 45 },
      background: "blue",
      text: "CSC224",
      onClick: () => console.log("224"),
    },
  ],
};
const tmpTimetable2 = {
  dayStart: 8,
  dayEnd: 22,
  title: "Second",
  allEvents: [],
};
const TimetablePage = () => {
  const classes = useStyles();
  const [term, setTerm] = React.useState<"F" | "S" | "Y">("Y");
  const outerTheme = useTheme();
  return (
    <MuiThemeProvider theme={getTheme(outerTheme)}>
      <div>
        <div className={classes.optionsBar}>
          <div className={classes.divider} />
          {["F", "S", "Y"].map((item) => (
            <Button
              className={classes.termChooserButton}
              variant="outlined"
              onClick={() => setTerm(item as "F" | "S" | "Y")}
              style={{ border: item !== term ? "none" : "" }}
              disableRipple
              key={item}
            >
              {item === "F"
                ? "First Term"
                : item === "S"
                ? "Second Term"
                : "Both Terms"}
            </Button>
          ))}
        </div>
        <Grid container>
          {"FY".includes(term) && (
            <Grid item xs={12} lg>
              <Timetable {...(tmpTimetable1 as TimetableProp)} />
            </Grid>
          )}
          {"SY".includes(term) && (
            <Grid item xs={12} lg>
              <Timetable {...(tmpTimetable2 as TimetableProp)} />
            </Grid>
          )}
        </Grid>
      </div>
    </MuiThemeProvider>
  );
};

export default TimetablePage;
