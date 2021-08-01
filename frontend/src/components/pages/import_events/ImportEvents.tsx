import React from "react";
import { Course, getCourse } from "../../../services/courses/courses";
import BadAxiosResponseError from "../../../services/helper";
import Notification from "./Notification";
import SearchBar from "./SearchBar";
import useStyles from "./ImportEvents.css";
import config from "../../../config";
import { Button, Fab, MuiThemeProvider, useTheme } from "@material-ui/core";
import ShowCourses from "./DisplayCourses";
import { getTheme } from "../timetable/TimetablePage.css";
import Instructions from "./Instructions";
import HelpIcon from "@material-ui/icons/HelpOutline";
import useStorage from "../../../storage/useStorage";
import { SimplifiedCourses } from "../../../services/courses/timetable_generation/helper";
import addToSimplifiedCourses from "../../../services/courses/timetable_generation/simplify_courses";
const ImportEvents = () => {
  const classes = useStyles();
  const pageVisited = useStorage<boolean>({
    key: "importCoursesPageVisited",
  });
  const showErrbar = React.useState(false);
  const [severity, setSeverity] = React.useState<"error" | "success">("error");
  const showDialog = React.useState(!pageVisited[0]);
  const [errMsg, setErrMsg] = React.useState<{
    title: React.ReactNode;
    message: React.ReactNode;
  }>({ title: "", message: "" });
  const [courses, setCourses] = React.useState<Course[]>([]);
  const handleSubmit = (search: string) => {
    const actualSearch = search.trim();
    if (actualSearch.length === 0) return;
    getCourse(actualSearch, config.session)
      .then((courses) => {
        setCourses(courses);
      })
      .catch((err) => {
        const actualErr: BadAxiosResponseError = err;
        const res = actualErr.getResponse();
        setSeverity("error");
        setErrMsg({
          title: `Error Code ${res.status}: ${res.statusText}`,
          message: res.data.message,
        });
        showErrbar[1](true);
      });
  };
  const [allCourses, setAllCourses] = useStorage<SimplifiedCourses>({
    key: "courses",
  });
  const outerTheme = useTheme();
  return (
    <MuiThemeProvider theme={getTheme(outerTheme)}>
      <div className={classes.header}>
        <div className={classes.searchBar}>
          <SearchBar
            placeholder="Search for a course like CSC108, ECO105, ..."
            handleSubmit={handleSubmit}
          />
        </div>

        {courses.length > 0 && (
          <Button
            variant="outlined"
            className={classes.import}
            onClick={() => {
              setAllCourses(addToSimplifiedCourses(courses, allCourses));
              setSeverity("success");
              setErrMsg({ title: "Successfully Saved Courses", message: "" });
              showErrbar[1](true);
            }}
            disableRipple
          >
            Save Courses
          </Button>
        )}
      </div>
      <ShowCourses setCourses={setCourses} courses={courses} />

      <Instructions open={showDialog} />
      <Notification
        message={errMsg.message}
        title={errMsg.title}
        onClose={() => showErrbar[1](false)}
        open={showErrbar}
        severity={severity}
      />
      <Fab
        aria-label="instructions"
        size="medium"
        color="primary"
        className={classes.fab}
        variant="extended"
        onClick={() => {
          showDialog[1](true);
          pageVisited[1](true);
        }}
      >
        <HelpIcon className={classes.helpIcon} />
        Show Instructions
      </Fab>
      <div className={classes.addMoreScroll} />
    </MuiThemeProvider>
  );
};

export default ImportEvents;
