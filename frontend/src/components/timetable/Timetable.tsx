import { TimetableEvent, TimetableProp } from "./Timetable.types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      overflow: "auto",
    },
    table: {
      position: "sticky",
      width: "100%",
      borderSpacing: 0,
    },
    titleCell: {
      textAlign: "left",
      verticalAlign: "bottom",
      padding: 0,
      width: "10%",
    },
    dayOfWeekCell: {
      textAlign: "left",
      verticalAlign: "bottom",
      padding: 0,
      width: "18%",
      color: "gray",
      fontWeight: "normal",
    },
    timeCell: {
      borderTop: "1px solid",
      verticalAlign: "top",
      textAlign: "left",
      paddingBottom: 30,
    },
    dataCell: {
      borderTop: "1px solid",
      padding: 8,
      margin: 0,
      position: "relative",
    },
  })
);

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
              opacity: "90%",
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
              {timetableProp.title}
            </th>
            {["Mon", "Tues", "Wed", "Thurs", "Fri"].map((item) => (
              <th scope="col" key={item} className={classes.dayOfWeekCell}>
                {item}
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
                  {currHour}:00
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
