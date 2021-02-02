import React from "react";
import GoogleCalendar from "./components/GoogleCalendar";

export default () => {
  return (
    <div>
      <GoogleCalendar
        dailyRecurrence={364}
        weeklyRecurrence={51}
        monthlyRecurrence={11}
        yearlyRecurrence={1}
        calendarUrl="os18f3pcj4kp880b28jq4dgd68@group.calendar.google.com"
        apiKey="yourApiKey"
      />
    </div>
  );
};
