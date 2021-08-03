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
  SimplifiedCourses,
  SimplifiedMeeting,
} from "../../../services/courses/timetable_generation/helper";
import { TeachingMethod } from "../../../services/courses/courses";
import {
  deleteMeeting,
  disableEnableMeeting,
} from "../../../services/courses/timetable_generation/simplify_courses";

export interface ShowMeetingsProps {
  meetings: SimplifiedMeeting[];
  teachingMethod: TeachingMethod;
  courses: SimplifiedCourses;
  setCourses: (val: SimplifiedCourses) => unknown;
}
const ShowMeetings = (props: ShowMeetingsProps) => {
  const classes = useStyles();
  const { meetings, teachingMethod, courses, setCourses } = props;
  const handleDisable = (meeting: SimplifiedMeeting) => {
    setCourses(disableEnableMeeting(courses, meeting));
  };
  const handleDelete = (meeting: SimplifiedMeeting) => {
    setCourses(deleteMeeting(courses, meeting));
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
                  {item.simpleSchedule.map((scheduleItem) => {
                    return (
                      <Typography
                        key={`${scheduleItem.meetingDayStr}-${scheduleItem.startHour}-${scheduleItem.startMin}-${scheduleItem.endHour}-${scheduleItem.endMin}`}
                      >
                        {`${scheduleItem.meetingDayStr}, ${scheduleItem.startHour}:${scheduleItem.startMin} to ${scheduleItem.endHour}:${scheduleItem.endMin}  `}
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
