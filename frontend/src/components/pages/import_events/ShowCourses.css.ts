import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  cardContent: {
    padding: 16,
    paddingBottom: 0,
  },
  classAction: {
    padding: 16,
  },
  deleteSection: {
    padding: 0,
  },
  card: {
    background: theme.palette.background.default,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  courseSelectionTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
  },
  deleteCourseSectionButton: {
    marginRight: theme.spacing(3),
    borderColor: theme.palette.error.main,
    borderWidth: 2,
  },
  expanded: {
    "&$expanded": {
      margin: 10,
    },
  },
  accordion: {
    margin: 10,
  },
}));

export default useStyles;
