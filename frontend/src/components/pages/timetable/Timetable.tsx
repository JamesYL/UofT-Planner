import { TimetableEvent, TimetableProp } from "./Timetable.types";
import { Typography } from "@material-ui/core";
import useStyles from "./Timetable.css";

const Timetable = (timetableProp: TimetableProp) => {
  const classes = useStyles();
  const totHours = timetableProp.dayEnd - timetableProp.dayStart + 1;
  const eventMap: {
    [dayOfWeek: number]: {
      [startHour: number]: TimetableEvent[];
    };
  } = {};
  timetableProp.allEvents.forEach((event) => {
    if (!eventMap[event.dayOfWeek]) eventMap[event.dayOfWeek] = {};
    if (!eventMap[event.dayOfWeek][event.start.hour])
      eventMap[event.dayOfWeek][event.start.hour] = [];
    eventMap[event.dayOfWeek][event.start.hour].push(event);
  });
  const getEventDivs = (startHour: number, dayOfWeek: number) => {
    const dayEvents = eventMap[dayOfWeek];
    if (dayEvents) {
      const events = eventMap[dayOfWeek][startHour];
      if (events) {
        return events.map((item) => (
          <div
            key={`${item.text} ${item.dayOfWeek} ${item.background} ${item.start} ${item.end}`}
            onClick={item.onClick}
            style={{
              position: "absolute",
              background: item.background,
              width: "100%",
              height: `${
                (item.end.hour +
                  item.end.minute / 60 -
                  (item.start.hour + item.start.minute / 60)) *
                100
              }%`,
              top: `${(item.start.minute / 60) * 100}%`,
              left: 0,
              textAlign: "center",
              verticalAlign: "center",
              lineHeight: `${
                (item.end.hour +
                  item.end.minute / 60 -
                  (item.start.hour + item.start.minute / 60) +
                  item.start.minute / 60) *
                100
              }%`,
              zIndex: 1,
              borderRadius: 20,
              opacity: "70%",
            }}
          >
            <Typography
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              component="p"
              variant="h5"
              className={classes.eventText}
            >
              {item.text}
            </Typography>
          </div>
        ));
      }
    }
    return <></>;
  };

  return (
    <div className={classes.root}>
      <table aria-label="timetable" className={classes.table}>
        <thead>
          <tr>
            <th scope="col" className={classes.titleCell}>
              <Typography component="h1" variant="body2">
                <b>{timetableProp.title}</b>
              </Typography>
            </th>
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((item) => (
              <th scope="col" key={item} className={classes.dayOfWeekCell}>
                <Typography component="h3" variant="h4">
                  {item}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {new Array(totHours).fill(0).map((_, i) => {
            const currHour = i + timetableProp.dayStart;
            return (
              <tr key={i}>
                <th scope="row" className={classes.timeCell}>
                  <span className={classes.timeCellText}>
                    <Typography
                      className={classes.timeCellTime}
                      component="p"
                      variant="h6"
                    >
                      {currHour <= 12 ? currHour : `${currHour - 12}`}
                    </Typography>{" "}
                    <Typography
                      className={classes.timeCellAMPM}
                      component="p"
                      variant="subtitle2"
                    >
                      {currHour <= 12 ? "AM" : "PM"}
                    </Typography>
                  </span>
                </th>
                {["Mon", "Tues", "Wed", "Thurs", "Fri"].map((item, i) => (
                  <td key={item} className={classes.dataCell}>
                    {getEventDivs(currHour, i + 1)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
