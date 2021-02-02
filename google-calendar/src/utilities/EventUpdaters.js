import moment from "moment";

export const setEventTimes = (events) => {
  return events.map((e) => {
    e.start.time = e.start.date
      ? moment(e.start.date)
      : moment(e.start.dateTime);
    e.end.time = e.end.date ? moment(e.end.date) : moment(e.end.dateTime);

    return e;
  });
};
