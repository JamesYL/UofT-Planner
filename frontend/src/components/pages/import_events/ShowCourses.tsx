import React from "react";
import {
  Accordion,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./ShowCourses.css";
import { Course, getFormattedSchedule } from "../../../services/courses/courses";
export interface ShowCoursesProps {
  setCourses: (courses: Course[]) => unknown;
  courses: Course[];
}

const ShowCourses = (props: ShowCoursesProps) => {
  const classes = useStyles();
  const { setCourses, courses } = props;
  const onDeleteMeetingSection =
    (courseIndex: number, meetingIndex: number) => () => {
      setCourses(
        courses
          .map((item, i) => {
            if (i !== courseIndex) return item;
            item.meetings = item.meetings.filter((_, j) => j !== meetingIndex);
            return item;
          })
          .filter((item) => item.meetings.length !== 0)
      );
    };
  const onDeleteCourseSelection =
    (index: number) =>
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();
      setCourses(courses.filter((_, i) => index !== i));
    };
  return (
    <>
      {courses.map((course, courseI) => (
        <Accordion
          key={course.code + course.section}
          classes={{ expanded: classes.expanded }}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="contents of course selection"
          >
            <Typography
              component="h2"
              variant="h5"
              className={classes.courseSelectionTitle}
            >
              {`${course.code}-${course.section} ${course.courseTitle}`}
            </Typography>
            <Button
              className={classes.deleteCourseSectionButton}
              variant="outlined"
              onClick={onDeleteCourseSelection(courseI)}
            >
              Delete Course Section
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              {course.meetings.map((item, meetingI) => (
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
                    </CardContent>
                    <CardActions className={classes.classAction}>
                      <Button
                        size="small"
                        className={classes.deleteSection}
                        onClick={onDeleteMeetingSection(courseI, meetingI)}
                      >
                        Delete Section
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
export default ShowCourses;
