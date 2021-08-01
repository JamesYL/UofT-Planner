import React from "react";
import {
  SimplifiedCourses,
  teachingMethod,
} from "../../../services/courses/timetable_generation/helper";
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

const ShowCourses = () => {
  const classes = useStyles();
  const [courses] = useStorage<SimplifiedCourses>({
    key: "courses",
  });
  const pageVisited = useStorage<boolean>({
    key: "viewCoursesPageVisited",
  });
  const showDialog = React.useState(!pageVisited[0]);

  return (
    <>
      {Object.keys(courses).map((key) => (
        <Accordion
          classes={{ expanded: classes.expanded }}
          className={classes.accordion}
          key={key}
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
              {key}
            </Typography>
          </AccordionSummary>
          {courses[key as teachingMethod].map((term) => (
            <AccordionDetails
              key={key + term.section}
              className={classes.accordingDetails}
            >
              <ShowTerm term={term} />
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
      {/* <Button variant="outlined">Save Changes</Button> */}
    </>
  );
};

export default ShowCourses;
