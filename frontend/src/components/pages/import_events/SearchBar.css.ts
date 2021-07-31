import { Theme, makeStyles } from "@material-ui/core";

export default makeStyles((theme: Theme) => ({
  root: {
    border: "1px solid",
    borderColor: theme.palette.text.secondary,
    borderRadius: 15,
    maxWidth: 600,
    display: "flex",
    width: "100%",
    background: theme.palette.background.paper,
  },
  button: {
    marginLeft: "auto",
  },
  input: {
    border: 0,
    flex: 1,
    marginLeft: 20,
    outlineStyle: "none",
    boxShadow: "none",
    borderColor: "transparent",
    "input::-ms-clear": {
      display: "none",
    },
    fontSize: 16,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1 /* Firefox */,
    },
  },
}));
