import { makeStyles, Theme } from "@material-ui/core";
const width = 200;
const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width,
  },
  drawerPaper: {
    width,
    background: theme.palette.background.default,
  },
  listItem: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));
export default useStyles;
