const ieee = require("axios");

export interface EventList_IEEE {
  dates: {
    events: Event_IEEE[]
    date: Date,
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
  startTime: Date,
  endTime: Date,
  locationName: string,
  locationUrl: string,
  link: string;
  createdOn: Date;
}

export async function getIeeeEvents() {
  try {
    const res = await ieee.get("https://ieeeutd.org/api/events");
    const response: EventList_IEEE = res.data;
    return response;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}
