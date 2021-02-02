const handleDailyEvent = (event, amount) => {
  let start = event.e.start.time;
  let end = event.e.end.time;
  const title = event.e.summary;
  let events = [
    {
      start,
      end,
      title,
    },
  ];
  for (let i = 0; i < amount; ++i) {
    start = start.clone().add(1, "d");
    end = end.clone().add(1, "d");
    events.push({
      start,
      end,
      title,
    });
  }
  return events;
};

const handleMonthlyEvent = (event, amount) => {
  let start = event.e.start.time;
  let end = event.e.end.time;
  const title = event.e.summary;
  const day = start.day();
  let date = start.date();
  let events = [
    {
      start,
      end,
      title,
    },
  ];

  if (date <= 7) {
    date = 1;
  } else if (date <= 14) {
    date = 8;
  } else if (date <= 21) {
    date = 15;
  } else if (date <= 28) {
    date = 22;
  } else {
    date = 29;
  }

  for (let i = 0; i < amount; ++i) {
    let startNext = new Date(
      start.year(),
      start.month() + i + 1,
      date,
      start.hour(),
      start.minutes()
    );
    let endNext = new Date(
      end.year(),
      end.month() + i + 1,
      date,
      end.hour(),
      end.minutes()
    );

    for (let j = 1; j <= 7; ++j) {
      if (day === startNext.getDay()) {
        events.push({
          start: startNext,
          end: endNext,
          title,
        });
        break;
      }

      startNext = new Date(
        startNext.getFullYear(),
        startNext.getMonth(),
        date + j,
        startNext.getHours(),
        startNext.getMinutes()
      );
      endNext = new Date(
        endNext.getFullYear(),
        endNext.getMonth(),
        date + j,
        endNext.getHours(),
        endNext.getMinutes()
      );

      // This means that we went into the next month
      if (startNext.getDate() < date) {
        break;
      }
    }
  }

  return events;
};

const handleRecurringEvents = (fn, events, amount) => {
  return events.map((e) => fn(e, amount));
};

const handleWeeklyEvent = (event, amount) => {
  let start = event.e.start.time;
  let end = event.e.end.time;
  const title = event.e.summary;
  let events = [
    {
      start,
      end,
      title,
    },
  ];

  for (let i = 0; i < amount; ++i) {
    start = start.clone().add(1, "w");
    end = end.clone().add(1, "w");
    events.push({
      start,
      end,
      title,
    });
  }

  return events;
};

const handleYearlyEvent = (event, amount) => {
  let start = event.e.start.time;
  let end = event.e.start.time;
  const title = event.e.summary;
  let events = [
    {
      start,
      end,
      title,
    },
  ];

  for (let i = 0; i < amount; ++i) {
    start = start.clone().add(1, "y");
    end = end.clone().add(1, "y");
    events.push({
      start,
      end,
      title,
    });
  }

  return events;
};

module.exports = {
  handleDailyEvent,
  handleMonthlyEvent,
  handleRecurringEvents,
  handleWeeklyEvent,
  handleYearlyEvent,
};
