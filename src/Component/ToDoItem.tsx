import React, { MouseEvent } from "react";
import "./ToDoItem.css";
import CategoryItem from "./CategoryItem";
import { Category } from "../types/Category";
import { TaskItem } from "../types/TaskItem";
import Checkbox from "./CheckBox";
import { DateTime } from "../types/DateTime";
import { getDateTimeFromTimeStamp } from "../util/dateHelpers";
type Props = {
  item: TaskItem;
  onChecked: (id: string) => void;
  // author: string;
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
          // categories.find(
          //   (category: Category) => category.id === item.categoryItem.id
          // )?.color || "white",
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
