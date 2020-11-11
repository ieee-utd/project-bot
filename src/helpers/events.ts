
const ieee = require("axios");

interface EventData {
  data: {
    dates: {
      month: number,
      day: number,
      events: {
        startTime: Date,
        locationUrl: string,
        title: string,
        locationName: string,
        tags: string[]
      }[]
    }[]
  }
}

export async function listEvents() 
{
  try {
    const response: EventData = await ieee.get("https://ieeeutd.org/api/events");
    console.log(response.data.dates[0].events);


    const currentDate = new Date();
    const todaysDate = currentDate.getDate();
    const nextEventsDay = `${response.data.dates[0].month} ${response.data.dates[0].day}`;

    let msg = "";
    let eventsToday = "";


    //Compare today with the date of the next event
    if(todaysDate != response.data.dates[0].day)
    {
      eventsToday = `There are no events today\n**Here are other events coming up on ${nextEventsDay}!**\n`; 
    }
    else if(todaysDate == response.data.dates[0].day)
    {
      eventsToday = `**Here are our events for today, ${response.data.dates[0].month} ${response.data.dates[0].day}!**\n\n`;
    }


    //Iterate through the events of today
    for (let eventCounter = 0; eventCounter < response.data.dates[0].events.length; eventCounter++)
    {
        //Event title
        eventsToday += `\t:fire: ${response.data.dates[0].events[eventCounter].title}`;

        //date calculation for time: line
        const actualDateObject = new Date(response.data.dates[0].events[eventCounter].startTime);
        console.log(actualDateObject);

        //Replace with Date library

        let actualHour = actualDateObject.getHours();
        console.log(actualHour);

        const actualTime = actualDateObject.getMinutes();
        console.log(actualTime);
        let actualAMPM = "";

        if(actualHour == 0)
        {
          actualHour = 12;
          actualAMPM = "AM";
        }
        else if(actualHour<12)
        {
        
          actualAMPM = "AM";
        }
        else if(actualHour == 12)
        {
          actualHour = 12;
          actualAMPM = "PM";
        }
        else if(actualHour > 12)
        {
          actualHour = actualHour - 12;
          actualAMPM = "PM";
        }

        //not done

        eventsToday += `\n\tTime: ${actualHour}: ${actualTime} ${actualAMPM}`;
        
        
        //Platform of event + url link
        eventsToday += `\n\t\t\t${response.data.dates[0].events[eventCounter].locationName}`;

         if(response.data.dates[0].events[eventCounter].locationUrl != "")
          eventsToday += `: <${response.data.dates[0].events[eventCounter].locationUrl}>`;
        

         //Ping subscribers for notifications
        for(let tagCounter = 0; tagCounter < response.data.dates[0].events[eventCounter].tags.length; tagCounter++)
        {
          eventsToday += `\n\t\t\t@${response.data.dates[0].events[eventCounter].tags[tagCounter]}`;
        }


        eventsToday += "\n\n";
    }

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

    msg = eventsToday;


    return msg;
  }

   catch (err) {
    console.error(err);
    return false;
  }
}