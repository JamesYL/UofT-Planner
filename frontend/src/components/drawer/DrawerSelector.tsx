import { List, Drawer, ListItem, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./DrawerSelector.css";

const DrawerSelector = () => {
  const classes = useStyles();
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
        {["View Timetable", "Import Courses", "View Events"].map((text) => (
          <ListItem button key={text} className={classes.listItem}>
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
