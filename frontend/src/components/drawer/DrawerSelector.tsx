import { List, Drawer, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./DrawerSelector.css";

const DrawerSelector = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        {[
          ["View Timetable", "/timetable"],
          ["Import Courses", "/import"],
          ["View Courses", "/edit"],
        ].map(([text, endpoint]) => (
          <ListItem
            button
            key={text}
            className={classes.listItem}
            onClick={() => history.push(endpoint)}
          >
            <Typography component="p" variant="h6">
              {text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default DrawerSelector;
