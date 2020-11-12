const schedule = require("node-schedule");
import { Event_IEEE, getIeeeEvents } from "./rest";

/* -------------------Planned configs--------------
 * Daily schedule from node-schedule activates
 *    if(obj.getDay() == response.data.dates[9].day)
 *        [Provide discord message...]
 * 
 * 
 * 
 * ---OR---
 * 
 * Daily node schedule runs
 * Get events
 * For event in events
 *    If event not already scheduled
 *    Schedule event reminder for the specific time (Nov 2 @ 7pm)
 *    Append to a scheduled events or something array to keep track
 * 
 * Event Node schedule runs
 * Send event reminde
 */


let scheduledEvents: Event_IEEE[] | null = null;
async function scheduleAnnouncements() {
  console.log("inside newevents");
  const eventList = await getIeeeEvents();
  if (!eventList) return;

  // FIXME implement scheduler
  scheduledEvents = eventList.dates[0].events;
  console.log(scheduledEvents);
  // iterate through the eventList
  // if the event is not in scheduledEvents (compare using _id)
  // schedule a one time announcement for the startTime
  // add the event to scheduledEvents
}


// function sendAnnouncement(event: Event_IEEE) {
//   // send the announcement
// }

schedule.scheduleJob("*/10 * * * * *", scheduleAnnouncements);
