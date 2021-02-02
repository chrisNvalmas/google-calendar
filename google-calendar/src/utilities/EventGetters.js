const getOneTimeEvents = (events) => {
  return events
    .filter((e) => !e.recurrence)
    .map((e) => {
      return {
        start: e.start.time,
        end: e.end.time,
        title: e.summary,
      };
    });
};

const getRecurringEvents = (events) => {
  return events
    .filter((e) => e.recurrence)
    .map((e) => {
      return {
        e: e,
        recurrence: e.recurrence[0].split(";"),
      };
    });
};

module.exports = {
  getOneTimeEvents,
  getRecurringEvents,
};
