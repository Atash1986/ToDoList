import { DateTime } from "../types/DateTime";

export function getFormatedDateTime() {
  const dateObject: Date = new Date();
  const day = dateObject.getDate();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const dayName: string = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const monthName: string = dateObject.toLocaleDateString("en-US", {
    month: "long",
  });

  const date: String = dayName + "," + day + " " + monthName.slice(0, 3);
  const time: String = hour + ":" + minute;
  const dateTime: DateTime = { date: date, time: time };
  return dateTime;
}
