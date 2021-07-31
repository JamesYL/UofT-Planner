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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShowTerm from "./ShowTerm";

const ShowCourses = () => {
  const classes = useStyles();
  const [courses] = useStorage<SimplifiedCourses>({
    key: "courses",
  });

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
    </>
  );
};

export default ShowCourses;
