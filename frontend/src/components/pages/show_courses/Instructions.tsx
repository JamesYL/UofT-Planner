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
    key: "viewCoursesPageVisited",
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
      <DialogTitle>Viewing Imported Courses</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Go to <b>Import Courses</b> to import the courses that you want.
        </DialogContentText>
        <DialogContentText>
          Disable certain sections if you don't want to include it when
          generating timetables.
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
