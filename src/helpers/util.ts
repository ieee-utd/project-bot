import { DateTime } from "luxon";

export function isSameDay(d1: DateTime, d2: DateTime) {
  // console.log(d1, d2);
  return d1.toLocaleString() == d2.toLocaleString();
}
