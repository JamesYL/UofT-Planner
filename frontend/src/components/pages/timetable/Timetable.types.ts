export interface TimeOfDay {
  /** 0 to 23 inclusive */
  hour: number;
  /** 0 to 59 inclusive */
  minute: number;
}
export interface TimetableEvent {
  /** Monday is 1, Tuesday is 2, ..., Friday is 5 */
  dayOfWeek: 1 | 2 | 3 | 4 | 5;
  /** When the event starts */
  start: TimeOfDay;
  /** When the event ends */
  end: TimeOfDay;
  /** Background CSS property string */
  background: string;
  /** Text that should show up */
  text: string;
  /** What happens when you click on the event */
  onClick?: () => unknown;
}
export interface TimetableProp {
  /** Start hour of timetable: 0 to 23 inclusive */
  dayStart: number;
  /** End hour of timetable: 0 to 23 inclusive */
  dayEnd: number;
  /** All events */
  allEvents: TimetableEvent[];
  title: string;
}
