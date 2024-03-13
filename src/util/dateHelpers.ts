import { DateTime } from "../types/DateTime";

export function getFormatedNow() {
  const dateObject: Date = new Date();
  return getFormatedDateTime(dateObject);
}

export function getFormatedDateTime(dateObject: Date) {
  const day = dateObject.getDate();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const dayName: string = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const monthName: string = dateObject.toLocaleDateString("en-US", {
    month: "long",
  });

  const date: string = dayName + "," + day + " " + monthName.slice(0, 3);
  const time: string = hour + ":" + minute;
  const dateTime: DateTime = { date: date, time: time };
  return dateTime;
}
export function getDateTimeFromTimeStamp(originalTimestamp: number) {
  const dateObject = new Date(originalTimestamp * 1000);
  const day = dateObject.getDate();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();
  const dayName: string = dateObject.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const monthName: string = dateObject.toLocaleDateString("en-US", {
    month: "long",
  });

  const date: string =
    dayName.slice(0, 3) + "," + day + " " + monthName.slice(0, 3);
  const time: string = hour + ":" + minute;
  const dateTime: DateTime = { date: date, time: time };
  return dateTime;
}
