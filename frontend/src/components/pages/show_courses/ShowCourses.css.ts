import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {
    padding: 16,
    paddingBottom: 0,
  },
  card: {
    background: theme.palette.background.default,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  summaryTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
  },
  expanded: {
    "&$expanded": {
      margin: theme.spacing(1),
      padding: 0,
      paddingBottom: theme.spacing(2),
    },
  },
  accordion: {
    margin: theme.spacing(1),
    padding: 0,
    flexGrow: 1,
  },
  termAccordion: {
    background: theme.palette.background.default,
  },
  meetingAccordionDetails: {
    padding: theme.spacing(0, 2),
  },
  accordingDetails: {
    padding: 0,
  },
  accordionSummary: {
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  noCoursesTitle: {
    marginTop: theme.spacing(10),
  },
  helpIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "fixed",
    right: theme.spacing(5),
    bottom: theme.spacing(5),
    background: "transparent",
    borderColor: theme.palette.text.primary,
    borderWidth: 2,
    borderStyle: "solid",
    color: theme.palette.text.primary,
    "&:hover": {
      background: theme.palette.background.paper,
    },
  },
}));

export default useStyles;
