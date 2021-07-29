import React from "react";
import { Course, getCourse } from "../../../services/courses";
import BadAxiosResponseError from "../../../services/helper";
import Notification from "../../util/Notification/Notification";
import SearchBar from "../../util/SearchBar/SearchBar";
import useStyles from "./ImportEvents.css";
const ImportEvents = () => {
  const classes = useStyles();
  const showErrbar = React.useState(false);
  const [errMsg, setErrMsg] = React.useState<{
    title: React.ReactNode;
    message: React.ReactNode;
  }>({ title: "", message: "" });
  const [courses, setCourses] = React.useState<Course[]>([]);
  const handleSubmit = (search: string) => {
    const actualSearch = search.trim();
    getCourse(actualSearch, "20219")
      .then((courses) => {
        if (courses.length === 0) {
          setErrMsg({
            title: "",
            message: (
              <>
                No courses found for <b>{actualSearch}</b>
              </>
            ),
          });
          showErrbar[1](true);
        } else setCourses(courses);
      })
      .catch((err) => {
        const actualErr: BadAxiosResponseError = err;
        const res = actualErr.getResponse();
        setErrMsg({
          title: `Error Code ${res.status}: ${res.statusText}`,
          message: (
            <>
              Failed to get courses for <b>{actualSearch}</b>
            </>
          ),
        });
        showErrbar[1](true);
      });
  };
  return (
    <div>
      <SearchBar
        placeholder="Search for a course like CSC108, ECO105, ..."
        handleSubmit={handleSubmit}
      />
      <Notification
        message={errMsg.message}
        title={errMsg.title}
        onClose={() => showErrbar[1](false)}
        open={showErrbar}
        alertProps={{ variant: "standard" }}
      />
      {courses.map((item) => (
        <div>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
};

export default ImportEvents;
