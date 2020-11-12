import { default as axios } from "axios";
import { EventList_IEEE } from "./ieeeEvent";

export async function getIeeeEvents() {
  try {
    const res = await axios.get("https://ieeeutd.org/api/events");
    const response: EventList_IEEE = res.data;
    return response;
  }
  catch (err) {
    console.error(err);
    return null;
  }
}
