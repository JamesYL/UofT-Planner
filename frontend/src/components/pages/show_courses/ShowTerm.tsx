import React from "react";
import useStyles from "./ShowCourses.css";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  SimplifiedTerm,
  teachingMethod,
} from "../../../services/courses/timetable_generation/helper";
import ShowMeetings from "./ShowMeetings";
import clsx from "clsx";

export interface ShowTermProps {
  term: SimplifiedTerm;
}
const ShowTerm = (props: ShowTermProps) => {
  const { term } = props;
  const classes = useStyles();
  return (
    <Accordion
      classes={{ expanded: classes.expanded }}
      className={clsx(classes.accordion, classes.termAccordion)}
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
          {term.section === "F"
            ? "First Term"
            : term.section === "S"
            ? "Second Term"
            : "Both Terms"}
        </Typography>
      </AccordionSummary>
      {Object.keys(term.meetingsByActivity)
        .filter(
          (key) => term.meetingsByActivity[key as teachingMethod].length !== 0
        )
        .map((key) => (
          <AccordionDetails key={key} className={classes.accordingDetails}>
            <ShowMeetings
              meetings={term.meetingsByActivity[key as teachingMethod]}
              teachingMethod={key as teachingMethod}
            />
          </AccordionDetails>
        ))}
    </Accordion>
  );
};

export default ShowTerm;
