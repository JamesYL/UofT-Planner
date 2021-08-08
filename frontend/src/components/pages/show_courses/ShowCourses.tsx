import React from "react";
import { SimplifiedCourses } from "../../../services/courses/timetable_generation/helper";
import useStorage from "../../../storage/useStorage";
import useStyles from "./ShowCourses.css";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Fab,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShowTerm from "./ShowTerm";
import Instructions from "./Instructions";
import HelpIcon from "@material-ui/icons/HelpOutline";
import { TeachingMethod } from "../../../services/courses/courses";
import {
  deleteCourse,
  disableEnableCourse,
} from "../../../services/courses/timetable_generation/simplifyCourses";

const ShowCourses = () => {
  const classes = useStyles();
  const [courses, setCourses] = useStorage<SimplifiedCourses>({
    key: "courses",
  });
  const pageVisited = useStorage<boolean>({
    key: "viewCoursesPageVisited",
  });
  const showDialog = React.useState(!pageVisited[0]);
  const handleDelete = (code: string) => {
    setCourses(deleteCourse(courses, code));
  };
  const handleDisable = (code: string) => {
    setCourses(disableEnableCourse(courses, code));
  };

  return (
    <>
      {Object.keys(courses)
        .sort()
        .map((key) => (
          <Accordion
            classes={{ expanded: classes.expanded }}
            className={classes.accordion}
            key={key}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={`${classes.accordionSummary} ${
                courses[key].disabled && classes.disabledAccordionSummary
              }`}
            >
              <Typography
                component="h2"
                variant="h5"
                className={classes.summaryTitle}
              >
                {key}
              </Typography>
              <Button
                className={classes.disableButton}
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDisable(key);
                }}
              >
                {courses[key].disabled ? "Enable" : "Disable"}
              </Button>
              <Button
                className={classes.deleteButton}
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(key);
                }}
              >
                Delete
              </Button>
            </AccordionSummary>
            {[...courses[key as TeachingMethod].terms]
              .sort((term1, term2) => {
                if (term1.section < term2.section) return -1;
                return 1;
              })
              .map((term) => (
                <AccordionDetails
                  key={key + term.section}
                  className={classes.accordingDetails}
                >
                  <ShowTerm
                    term={term}
                    courses={courses}
                    setCourses={setCourses}
                  />
                </AccordionDetails>
              ))}
          </Accordion>
        ))}
      {Object.keys(courses).length === 0 && (
        <Typography
          component="h1"
          variant="h3"
          align="center"
          className={classes.noCoursesTitle}
        >
          No Courses Found
        </Typography>
      )}
      <Instructions open={showDialog} />
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
    </>
  );
};

export default ShowCourses;
