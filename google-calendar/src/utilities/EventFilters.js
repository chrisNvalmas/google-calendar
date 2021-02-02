const CANCELLED = `cancelled`;

const filterByRecurrence = (keyword, events) => {
  return events.filter((e) => e.recurrence[0] === keyword);
};

const filterOutCancelledEvents = (events) => {
  return events.filter((e) => e.status !== CANCELLED);
};

module.exports = {
  filterByRecurrence,
  filterOutCancelledEvents,
};
