import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  DialogContentText,
  makeStyles,
  Theme,
} from "@material-ui/core";
import useStorage from "../../../storage/useStorage";
const useStyles = makeStyles((theme: Theme) => ({
  okButton: {
    borderColor: theme.palette.text.primary,
  },
}));

export interface InstructionsProps {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
const Instructions = (props: InstructionsProps) => {
  const classes = useStyles();
  const { open } = props;
  const pageVisited = useStorage<boolean>({
    key: "importCoursesPageVisited",
  });
  const handleClose = () => {
    open[1](false);
    pageVisited[1](true);
  };
  return (
    <Dialog
      open={open[0]}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>Importing Potential Courses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We need you to import courses so we can generate timetables for you.
        </DialogContentText>
        <DialogContentText>
          Search for a course, remove sections, then import!
        </DialogContentText>
        <DialogContentText>
          Remove sections that you don't have priority/access to, or remove the
          second term of a course if you need it to be a prerequsite.
        </DialogContentText>
        <DialogContentText>
          <b>
            Only remove sections that you will not FOR SURE not want so we can
            generate a variety of good timetable options.
          </b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          className={classes.okButton}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Instructions;
