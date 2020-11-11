// event message scheduling here


const ieee = require("axios");
var schedule = require('node-schedule');


interface EventData {
    data: {
          dates: {
            events: {
              _id: number,
              reservationRequired: boolean;
              recurrenceRule: string;
              tags: string[],
              title: string,
              startTime: Date,
              endTime: Date,
              locationName: string,
              locationUrl: string,
              link: string;
              createdOn: Date;
            }[]
            date: Date,
            day: number,
            month: string,
            year: number
          }[]
    }
  }

  console.log('test, this should be running');






    let response: EventData;
    async function localEventsInitializer() 
  {
    try {
        console.log("inside localeventslistener");
        response = await ieee.get("https://ieeeutd.org/api/events");
        console.log(response.data);
        return true;
    }
  
     catch (err) {
      console.error(err);
      return false;
    }
  }
  localEventsInitializer();





  async function newEventAnnouncer() 
  {
    try {
        console.log("inside newevents");
        let updatedEvents: EventData = await ieee.get("https://ieeeutd.org/api/events");
        console.log(updatedEvents.data);

        if(updatedEvents.data.dates===response.data.dates)
        {
            console.log("they is the same")
            return true;
        }
        else
        {

            console.log("they aint the same");
            return true;
        }

      }
  
  catch (err) {
      console.error(err);
      return false;
  }
  }





var cronJob = schedule.scheduleJob('*/10 * * * * *', function()
{
console.log('test, this should be running every couple of seconds');
newEventAnnouncer();
})
cronJob.start;
 
