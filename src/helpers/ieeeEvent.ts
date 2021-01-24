import { default as axios } from "axios";
import { DateTime } from "luxon";
import * as _ from "lodash";
import { isSameDay } from "./util";

export interface Event_IEEE {
  _id: string,
  reservationRequired: boolean;
  recurrenceRule: string;
  tags: string[],
  title: string,
  startTime: DateTime, // ISO date in UTC
  endTime: DateTime, // ISO date in UTC
  locationName: string,
  locationUrl: string,
  link: string;
  createdOn: string;
}

export async function getIeeeEvents() {
  try {
    const todaysDate = DateTime.local(2021, 1, 24);
    const res: any = (await axios.get("https://ieeeutd.org/api/events")).data;
    if (res) {
      const events: any[] = _.flatten(res.dates.map((e: any) => { return e.events; }));
      const eventList: Event_IEEE[] = events.map((e: any) => { return { ...e, startTime: isoToDateTime(e.startTime), endTime: isoToDateTime(e.endTime) }; }).filter((e) => todaysDate <= e.startTime);
      return eventList;
    }
    return null;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

export function formatEvents(events: Event_IEEE[]) {
  if (events.length === 0) {
    return "There are no upcoming events.";
  }

  events = _.sortBy(events, ["startTime"]);
  const todaysDate = DateTime.local();
  const nextEventDate = events[0].startTime;

  let message = "";
  if (!isSameDay(todaysDate, nextEventDate)) {
    message = `There are no events today\n**Here are other events coming up on ${nextEventDate.toLocaleString()}!**\n`;
  }
  else {
    message = `**Here are our events for today, ${events[0].startTime.toLocaleString()}!**\n\n`;
  }
  message += events.filter((e) => { return nextEventDate.startOf("day") <= e.startTime && nextEventDate.endOf("day") >= e.startTime; }).map((e) => { return eventToString(e); }).join("\n\n");
  return message;
}

export function eventToString(event: Event_IEEE) {
  let str = "";

  //Event title
  str += `\t:fire: ${event.title}`;

  //date calculation for time: line
  str += "\n\t" + "Time: " + event.startTime.toLocaleString(DateTime.TIME_SIMPLE);

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

function isoToDateTime(d: string) {
  return DateTime.fromISO(d);
}
