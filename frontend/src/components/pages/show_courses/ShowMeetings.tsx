import React from "react";
import useStyles from "./ShowCourses.css";
import {
  Accordion,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  Typography,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { teachingMethod } from "../../../services/courses/timetable_generation/helper";
import {
  getFormattedSchedule,
  Meeting,
} from "../../../services/courses/courses";

export interface ShowMeetingsProps {
  meetings: Meeting[];
  teachingMethod: teachingMethod;
}
const ShowMeetings = (props: ShowMeetingsProps) => {
  const classes = useStyles();
  const { meetings, teachingMethod } = props;
  return (
    <Accordion
      classes={{ expanded: classes.expanded }}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.accordionSummary}
      >
        <Typography
          component="h2"
          variant="h5"
          className={classes.summaryTitle}
        >
          {teachingMethod}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.meetingAccordionDetails}>
        <Grid container spacing={4}>
          {meetings.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}
              key={item.teachingMethod + item.sectionNumber}
            >
              <Card elevation={0} className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography
                    component="h3"
                    variant="h6"
                  >{`${item.teachingMethod}${item.sectionNumber}`}</Typography>
                  <Typography>
                    {item.deliveryMode === "ONLSYNC"
                      ? "Online Synchronous"
                      : item.deliveryMode === "CLASS"
                      ? "In Person"
                      : "Asynchronous"}
                    {item.contactHours &&
                      `${
                        item.contactHours &&
                        ` (${item.contactHours} hours per week)`
                      }`}
                  </Typography>
                  {item.instructors.length !== 0 && (
                    <Typography>
                      Taught by{" "}
                      {item.instructors
                        .map(
                          (instructor) =>
                            `${instructor.firstName}. ${instructor.lastName}`
                        )
                        .join(", ")}
                    </Typography>
                  )}
                  {item.schedule.map((scheduleItem) => {
                    const formatted = getFormattedSchedule(scheduleItem);
                    return (
                      <Typography
                        key={`${formatted.meetingDay}${formatted.meetingStartTime}${formatted.meetingEndTime}`}
                      >
                        {`${formatted.meetingDay.substring(0, 3)}, ${
                          formatted.meetingStartTime
                        } to ${formatted.meetingEndTime} `}
                      </Typography>
                    );
                  })}
                  {/* <Button>Disable</Button> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShowMeetings;
