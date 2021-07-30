import React from "react";
import {
  Course,
  getCourse,
  getFormattedSchedule,
} from "../../../services/courses";
import BadAxiosResponseError from "../../../services/helper";
import Notification from "../../util/Notification/Notification";
import SearchBar from "../../util/SearchBar/SearchBar";
import useStyles from "./ImportEvents.css";
import config from "../../../config";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { getTheme } from "./ImportEvents.css";
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
  IconButton,
  MuiThemeProvider,
  useTheme,
} from "@material-ui/core";
const ImportEvents = () => {
  const classes = useStyles();
  const showErrbar = React.useState(false);
  const [errMsg, setErrMsg] = React.useState<{
    title: React.ReactNode;
    message: React.ReactNode;
  }>({ title: "", message: "" });
  const [courses, setCourses] = React.useState<Course[]>([]);
  const handleSubmit = (search: string) => {
    const actualSearch = search.trim();
    getCourse(actualSearch, config.session)
      .then((courses) => {
        setCourses(courses);
      })
      .catch((err) => {
        const actualErr: BadAxiosResponseError = err;
        const res = actualErr.getResponse();
        setErrMsg({
          title: `Error Code ${res.status}: ${res.statusText}`,
          message: res.data.message,
        });
        showErrbar[1](true);
      });
  };
  const outerTheme = useTheme();
  return (
    <MuiThemeProvider theme={getTheme(outerTheme)}>
      <SearchBar
        placeholder="Search for a course like CSC108, ECO105, ..."
        handleSubmit={handleSubmit}
      />

      {courses.map((course) => (
        <Accordion key={course.code + course.section}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="contents of course selection"
          >
            <Typography component="h2" variant="h5">
              {`${course.code}-${course.section} ${course.courseTitle}`}
            </Typography>
            <IconButton onClick={(event) => event.stopPropagation()}>
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>
              {course.meetings.map((item) => (
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
                      <Button size="small" className={classes.deleteSection}>
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

      <Notification
        message={errMsg.message}
        title={errMsg.title}
        onClose={() => showErrbar[1](false)}
        open={showErrbar}
        alertProps={{ variant: "standard" }}
      />
    </MuiThemeProvider>
  );
};

export default ImportEvents;
