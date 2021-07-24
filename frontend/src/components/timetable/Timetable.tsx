import React from "react";
import {
  Paper,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@material-ui/core";
import { TimetableProp } from "./Timetable.types";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
    },
  })
);

const Timetable = (timetableProp: TimetableProp) => {
  const classes = useStyles();
  const totHours = timetableProp.dayEnd - timetableProp.dayStart + 1;
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="timetable" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="col">
              {timetableProp.title}
            </TableCell>
            {["Mon", "Tues", "Wed", "Thurs", "Fri"].map((item) => (
              <TableCell component="th" scope="col" key={item}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {new Array(totHours).fill(0).map((_, i) => {
            const currHour = i + timetableProp.dayStart;
            return (
              <TableRow key={i} style={{ top: `${(i / totHours) * 100}%` }}>
                <TableCell component="th" scope="row">
                  {currHour}:00
                </TableCell>
                {["Mon", "Tues", "Wed", "Thurs", "Fri"].map((item) => (
                  <TableCell component="th" scope="col" key={item}>
                    hi
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Timetable;
