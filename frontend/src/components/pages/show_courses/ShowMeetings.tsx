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
  CardActions,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  SimplifiedTerm,
  teachingMethod,
  SimplifiedMeeting,
} from "../../../services/courses/timetable_generation/helper";
import { getFormattedSchedule } from "../../../services/courses/courses";

export interface ShowMeetingsProps {
  meetings: SimplifiedMeeting[];
  teachingMethod: teachingMethod;
  setTerm: (val: SimplifiedTerm) => unknown;
  term: SimplifiedTerm;
  deleteTerm: () => unknown;
}
const ShowMeetings = (props: ShowMeetingsProps) => {
  const classes = useStyles();
  const { meetings, teachingMethod, term, setTerm, deleteTerm } = props;
  const handleDisable = (meeting: SimplifiedMeeting) => {
    const termCpy = { ...term };
    const meetingsByActivityCpy = { ...term.meetingsByActivity };
    const meetingsCpy = [...meetingsByActivityCpy[teachingMethod]];
    meetingsCpy.forEach((innerMeeting) => {
      if (meeting.sectionNumber === innerMeeting.sectionNumber) {
        innerMeeting.disabled = !innerMeeting.disabled;
      }
    });
    meetingsByActivityCpy[teachingMethod] = meetingsCpy;
    termCpy.meetingsByActivity = meetingsByActivityCpy;
    setTerm(termCpy);
  };
  const handleDelete = (meeting: SimplifiedMeeting) => {
    const termCpy = { ...term };
    const meetingsByActivityCpy = { ...term.meetingsByActivity };
    const meetingsCpy = [...meetingsByActivityCpy[teachingMethod]];
    meetingsByActivityCpy[teachingMethod] = meetingsCpy.filter(
      (innerMeeting) => meeting.sectionNumber !== innerMeeting.sectionNumber
    );
    termCpy.meetingsByActivity = meetingsByActivityCpy;
    setTerm(termCpy);
    for (const key in termCpy.meetingsByActivity) {
      if (termCpy.meetingsByActivity[key as teachingMethod].length !== 0) {
        return;
      }
    }
    // No more data left in term
    deleteTerm();
  };
  return (
    <Accordion
      classes={{ expanded: classes.expanded }}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={`${classes.accordionSummary}`}
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
              <Card
                elevation={0}
                className={`${classes.card} ${
                  item.disabled && classes.cardDisabled
                }`}
              >
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
                </CardContent>
                <CardActions className={classes.cardAction}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDisable(item);
                    }}
                  >
                    {item.disabled ? "Enable" : "Disable"}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default ShowMeetings;
