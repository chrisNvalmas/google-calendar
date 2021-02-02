import axios from "axios";
import {
  filterOutCancelledEvents,
  filterByRecurrence,
} from "../utilities/EventFilters";
import {
  getOneTimeEvents,
  getRecurringEvents,
} from "../utilities/EventGetters";
import {
  handleDailyEvent,
  handleMonthlyEvent,
  handleRecurringEvents,
  handleWeeklyEvent,
  handleYearlyEvent,
} from "../utilities/EventHandlers";
import { setEventTimes } from "../utilities/EventUpdaters";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const LOCALIZER = momentLocalizer(moment);
const DAILY_RECCURRENCE_KEYWORD = `RRULE:FREQ=DAILY`;
const WEEKLY_RECCURRENCE_KEYWORD = `RRULE:FREQ=WEEKLY`;
const MONTHLY_RECCURRENCE_KEYWORD = `RRULE:FREQ=MONTHLY`;
const YEARLY_RECURRENCE_KEYWORD = `RRULE:FREQ=YEARLY`;
let dailyRecurrenceAmount = 1;
let weeklyRecurrenceAmount = 1;
let monthlyRecurrenceAmount = 1;
let yearlyRecurrenceAmount = 1;

const createEvents = (events) => {
  const nonCancelledEvents = filterOutCancelledEvents(events);
  const formattedEvents = setEventTimes(nonCancelledEvents);
  const oneTimeEvents = getOneTimeEvents(formattedEvents);
  const recurringEvents = getRecurringEvents(formattedEvents);
  const dailyEvents = filterByRecurrence(
    DAILY_RECCURRENCE_KEYWORD,
    recurringEvents
  );
  const weeklyEvents = filterByRecurrence(
    WEEKLY_RECCURRENCE_KEYWORD,
    recurringEvents
  );
  const monthlyEvents = filterByRecurrence(
    MONTHLY_RECCURRENCE_KEYWORD,
    recurringEvents
  );
  const yearlyEvents = filterByRecurrence(
    YEARLY_RECURRENCE_KEYWORD,
    recurringEvents
  );
  const dailies = handleRecurringEvents(
    handleDailyEvent,
    dailyEvents,
    dailyRecurrenceAmount
  ).flat();
  const weeklies = handleRecurringEvents(
    handleWeeklyEvent,
    weeklyEvents,
    weeklyRecurrenceAmount
  ).flat();
  const monthlies = handleRecurringEvents(
    handleMonthlyEvent,
    monthlyEvents,
    monthlyRecurrenceAmount
  ).flat();
  const yearlies = handleRecurringEvents(
    handleYearlyEvent,
    yearlyEvents,
    yearlyRecurrenceAmount
  ).flat();
  const allEvents = []
    .concat(oneTimeEvents, dailies, weeklies, monthlies, yearlies)
    .flat();
  return allEvents;
};

const GoogleCalendar = ({
  dailyRecurrence,
  weeklyRecurrence,
  monthlyRecurrence,
  yearlyRecurrence,
  calendarUrl,
  apiKey,
}) => {
  const [events, setEvents] = useState([]);
  dailyRecurrenceAmount = dailyRecurrence;
  weeklyRecurrenceAmount = weeklyRecurrence;
  monthlyRecurrenceAmount = monthlyRecurrence;
  yearlyRecurrenceAmount = yearlyRecurrence;

  useEffect(() => {
    const getCalendar = async () => {
      const {
        data: { items },
      } = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarUrl}/events?key=${apiKey}`
      );

      const finalizedEvents = createEvents(items);
      setEvents(finalizedEvents);
    };

    getCalendar();
  }, [calendarUrl, apiKey]);

  return (
    <div>
      <Calendar
        localizer={LOCALIZER}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default GoogleCalendar;
