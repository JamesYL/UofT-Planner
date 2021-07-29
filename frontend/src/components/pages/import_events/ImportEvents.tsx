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
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
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
  return (
    <>
      <SearchBar
        placeholder="Search for a course like CSC108, ECO105, ..."
        handleSubmit={handleSubmit}
      />
      {courses.map((course) => (
        <>
          <Typography component="h2" variant="h6">
            {`${course.code}-${course.section} ${course.courseTitle}`}
          </Typography>
          <Button size="small" variant="contained">
            Delete Course Selection
          </Button>

          <Grid container key={course.code + course.section}>
            {course.meetings.map((item) => (
              <Grid item lg={4} key={item.teachingMethod + item.sectionNumber}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography>{`${item.teachingMethod}${item.sectionNumber}`}</Typography>
                    <Typography>
                      {`Delivery Mode: ${
                        item.deliveryMode === "ONLSYNC"
                          ? "Online Synchronous"
                          : item.deliveryMode === "CLASS"
                          ? "In Person"
                          : "Asynchronous"
                      }`}
                      {item.contactHours &&
                        `${
                          item.contactHours &&
                          ` (${item.contactHours} hours per week)`
                        }`}
                    </Typography>
                    <Typography>
                      Taught By:{" "}
                      {item.instructors.length !== 0
                        ? `${item.instructors
                            .map(
                              (instructor) =>
                                `${instructor.firstName}. ${instructor.lastName}`
                            )
                            .join(", ")}`
                        : "Unknown"}
                    </Typography>
                    {item.schedule.length !== 0 && (
                      <Typography>Schedule:</Typography>
                    )}
                    {item.schedule.map((scheduleItem) => {
                      const formatted = getFormattedSchedule(scheduleItem);
                      return (
                        <Typography
                          key={`${formatted.meetingDay}${formatted.meetingStartTime}${formatted.meetingEndTime}`}
                        >
                          {`On ${formatted.meetingDay.substring(0, 3)}, from ${
                            formatted.meetingStartTime
                          } to ${formatted.meetingEndTime} `}
                        </Typography>
                      );
                    })}
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">
                      Delete Section
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ))}

      <Notification
        message={errMsg.message}
        title={errMsg.title}
        onClose={() => showErrbar[1](false)}
        open={showErrbar}
        alertProps={{ variant: "standard" }}
      />
    </>
  );
};

export default ImportEvents;
