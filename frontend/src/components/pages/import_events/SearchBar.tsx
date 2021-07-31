import React from "react";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./SearchBar.css";

export interface SearchBarProps {
  placeholder: string;
  handleSubmit: (search: string) => unknown;
}

const SearchBar = (props: SearchBarProps) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState("");
  const { placeholder, handleSubmit } = props;
  return (
    <div className={classes.root}>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(search);
        }}
        placeholder={placeholder}
        className={classes.input}
      />
      <IconButton
        onClick={() => handleSubmit(search)}
        className={classes.button}
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};
export default SearchBar;
