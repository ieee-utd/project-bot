export function isSameDay(d1: Date, d2: Date) {
  return d1.toLocaleDateString("en-US") == d2.toLocaleDateString("en-US");
}
