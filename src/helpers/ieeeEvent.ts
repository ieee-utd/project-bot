import { EventList_IEEE, Event_IEEE } from "./rest";
import { isSameDay } from "./util";

export function formatEvents(events: EventList_IEEE) {
  const todaysDate = new Date();
  const nextEventsDate = new Date(events.dates[0].date);

  let eventsToday = "";
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
  const actualDateObject = new Date(event.startTime);

  str += "\n\t" + "Time: " + actualDateObject.toLocaleString();

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
