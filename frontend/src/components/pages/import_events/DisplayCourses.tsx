import React from "react";
import { Typography } from "@material-ui/core";
import useStyles from "./DisplayCourses.css";
import { Course } from "../../../services/courses/getCourse";
export interface DisplayCoursesProps {
  courses: Course[];
}

const DisplayCourses = (props: DisplayCoursesProps) => {
  const classes = useStyles();
  const { courses } = props;

  return (
    <>
      {courses.map((course) => (
        <Typography
          key={course.code + course.section}
          component="h2"
          variant="h5"
          className={classes.courseSelectionTitle}
        >
          {`${course.code}-${course.section} ${course.courseTitle}`}
        </Typography>
      ))}
    </>
  );
};
export default DisplayCourses;
