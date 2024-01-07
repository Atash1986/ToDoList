import React, { MouseEvent } from "react";
import "./ToDoItem.css";
import CategoryItem from "./CategoryItem";
import { Category } from "../types/Category";
import categories from "../data/categories";
import { TaskItem } from "../types/TaskItem";
import Checkbox from "./CheckBox";
import { DateTime } from "../types/DateTime";

type Props = {
  item: TaskItem;
  onChecked: (id: string) => void;
  author: string;
};
function getDateTimeFromTimeStamp(originalTimestamp: number) {
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

  const date: String =
    dayName.slice(0, 3) + "," + day + " " + monthName.slice(0, 3);
  const time: String = hour + ":" + minute;
  const dateTime: DateTime = { date: date, time: time };
  return dateTime;
}

function ToDoItem({ item, onChecked, author }: Props) {
  const dateAndTime = getDateTimeFromTimeStamp(item.creationDate);

  return (
    <li
      className="taskItem"
      id={String(item.id)}
      style={{ textDecoration: item.isDone ? "line-through" : "none" }}
    >
      <div
        className="category"
        style={{
          backgroundColor: item.categoryItem.color || "white",
          // categories.find(
          //   (category: Category) => category.id === item.categoryItem.id
          // )?.color || "white",
        }}
      ></div>
      <div className="titleCol">{item.title}</div>
      <div className="authorCol">{author} </div>
      <div className="dateAndTimeCol">
        <span className="taskDate">{dateAndTime?.date}</span>
        <span className="taskDate">{dateAndTime?.time}</span>
      </div>
      <Checkbox item={item} onChecked={onChecked} />
    </li>
  );
}

export default ToDoItem;
