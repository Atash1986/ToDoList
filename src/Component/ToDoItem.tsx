import React from "react";
import "./ToDoItem.css";
import { TaskItem } from "../types/TaskItem";
import Checkbox from "./CheckBox";
import { getDateTimeFromTimeStamp } from "../util/dateHelpers";

type Props = {
  item: TaskItem;
  onChecked: (id: string) => void;
};

function ToDoItem({ item, onChecked }: Props) {
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
        }}
      ></div>
      <div className="titleCol">{item.title}</div>
      <div className="authorCol">{item.author?.name || "Default name"} </div>
      <div className="dateAndTimeCol">
        <span className="taskDate">{dateAndTime?.date}</span>
        <span className="taskDate">{dateAndTime?.time}</span>
      </div>
      <Checkbox item={item} onChecked={onChecked} />
    </li>
  );
}

export default ToDoItem;
