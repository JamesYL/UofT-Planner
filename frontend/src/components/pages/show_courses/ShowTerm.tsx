import React from "react";
import useStyles from "./ShowCourses.css";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  SimplifiedCourses,
  SimplifiedTerm,
} from "../../../services/courses/timetable_generation/helper";
import ShowMeetings from "./ShowMeetings";
import clsx from "clsx";
import { TeachingMethod } from "../../../services/courses/getCourse";
import {
  deleteTerm,
  disableEnableTerm,
} from "../../../services/courses/timetable_generation/simplifyCourses";

export interface ShowTermProps {
  term: SimplifiedTerm;
  courses: SimplifiedCourses;
  setCourses: (val: SimplifiedCourses) => unknown;
}
const ShowTerm = (props: ShowTermProps) => {
  const { term, courses, setCourses } = props;
  const classes = useStyles();

  const handleDelete = () => {
    setCourses(deleteTerm(courses, term));
  };
  const handleDisable = () => {
    setCourses(disableEnableTerm(courses, term));
  };
  return (
    <Accordion
      classes={{ expanded: classes.expanded }}
      className={clsx(classes.accordion, classes.termAccordion)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        className={`${classes.accordionSummary} ${
          term.disabled && classes.disabledAccordionSummary
        }`}
      >
        <Typography
          component="h2"
          variant="h5"
          className={classes.summaryTitle}
        >
          {term.section === "F"
            ? "First Term"
            : term.section === "S"
            ? "Second Term"
            : "Both Terms"}
        </Typography>
        <Button
          className={classes.disableButton}
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            handleDisable();
          }}
        >
          {term.disabled ? "Enable" : "Disable"}
        </Button>
        <Button
          className={classes.deleteButton}
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          Delete
        </Button>
      </AccordionSummary>
      {Object.keys(term.meetingsByActivity)
        .sort()
        .filter(
          (key) => term.meetingsByActivity[key as TeachingMethod].length !== 0
        )
        .map((key) => (
          <AccordionDetails key={key} className={classes.accordingDetails}>
            <ShowMeetings
              meetings={term.meetingsByActivity[key as TeachingMethod]}
              teachingMethod={key as TeachingMethod}
              courses={courses}
              setCourses={setCourses}
            />
          </AccordionDetails>
        ))}
    </Accordion>
  );
};

export default ShowTerm;
