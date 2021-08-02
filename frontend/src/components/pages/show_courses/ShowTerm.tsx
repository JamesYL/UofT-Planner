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
  teachingMethod,
} from "../../../services/courses/timetable_generation/helper";
import ShowMeetings from "./ShowMeetings";
import clsx from "clsx";

export interface ShowTermProps {
  term: SimplifiedTerm;
  code: string;
  courses: SimplifiedCourses;
  setCourses: (val: SimplifiedCourses) => unknown;
}
const ShowTerm = (props: ShowTermProps) => {
  const { term, code, courses, setCourses } = props;
  const classes = useStyles();
  const setTerm = (newTerm: SimplifiedTerm) => {
    const coursesCpy = { ...courses };
    const courseCpy = { ...coursesCpy[code] };
    courseCpy.terms = [
      ...courseCpy.terms.filter((outer) => newTerm.section !== outer.section),
      newTerm,
    ];
    coursesCpy[code] = courseCpy;
    setCourses(coursesCpy);
  };
  const handleDelete = () => {
    const coursesCpy = { ...courses };
    const courseCpy = { ...coursesCpy[code] };
    courseCpy.terms = courseCpy.terms.filter(
      (outer) => term.section !== outer.section
    );
    coursesCpy[code] = courseCpy;
    if (coursesCpy[code].terms.length === 0) {
      delete coursesCpy[code];
    }
    setCourses(coursesCpy);
  };
  const handleDisable = () => {
    const termCpy = { ...term, disabled: !term.disabled };
    setTerm(termCpy);
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
          (key) => term.meetingsByActivity[key as teachingMethod].length !== 0
        )
        .map((key) => (
          <AccordionDetails key={key} className={classes.accordingDetails}>
            <ShowMeetings
              meetings={term.meetingsByActivity[key as teachingMethod]}
              teachingMethod={key as teachingMethod}
              setTerm={setTerm}
              term={term}
              deleteTerm={handleDelete}
            />
          </AccordionDetails>
        ))}
    </Accordion>
  );
};

export default ShowTerm;
