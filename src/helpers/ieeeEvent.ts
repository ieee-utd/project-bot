import { DateTime } from "luxon";
import { isSameDay } from "./util";

export interface EventList_IEEE {
  dates: {
    events: Event_IEEE[]
    date: string, // ISO date in local time
    day: number,
    month: string,
    year: number
  }[]
}

export interface Event_IEEE {
  _id: string,
  reservationRequired: boolean;
  recurrenceRule: string;
  tags: string[],
  title: string,
  startTime: string, // ISO date in UTC
  endTime: string, // ISO date in UTC
  locationName: string,
  locationUrl: string,
  link: string;
  createdOn: string;
}

export function formatEvents(events: EventList_IEEE) {
  const todaysDate = DateTime.local(); // This is local time America/Chicago
  const nextEventsDate = DateTime.fromISO(events.dates[0].date, { zone: "utc" }); // This is already in local time so parse as UTC to ignore timezone

  let eventsToday = "";
  // FIXME verify dates are in future (don't assume previous events are always removed)
  // this assumes that all previous events are removed (they are - but shouldn't assume)
  if (!isSameDay(todaysDate, nextEventsDate)) {
    eventsToday = `There are no events today\n**Here are other events coming up on ${events.dates[0].month} ${events.dates[0].day}!**\n`;
  }
  else {
    eventsToday = `**Here are our events for today, ${events.dates[0].month} ${events.dates[0].day}!**\n\n`;
  }

  eventsToday += events.dates[0].events.map((e) => { return eventToString(e); }).join("\n\n");
  return eventsToday;
}

export function eventToString(event: Event_IEEE) {
  let str = "";

  //Event title
  str += `\t:fire: ${event.title}`;

  //date calculation for time: line
  const actualDateObject = DateTime.fromISO(event.startTime);
  str += "\n\t" + "Time: " + actualDateObject.toLocaleString(DateTime.TIME_SIMPLE);

  //Platform of event + url link
  str += `\n\t\t\t${event.locationName}`;

  if (event.locationUrl != "")
    str += `: <${event.locationUrl}>`;


  //Ping subscribers for notifications
  for (let tagCounter = 0; tagCounter < event.tags.length; tagCounter++) {
    str += `\n\t\t\t@${event.tags[tagCounter]}`;
  }
  return str;
}
