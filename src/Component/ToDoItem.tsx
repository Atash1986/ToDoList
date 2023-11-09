import React, { MouseEvent } from "react";
import "./ToDoItem.css";

// import CircularCheckbox from "./CircularCheckBox";
import CategoryColors from "./CategoryColors";
type Props = {
  id: number;
  title: string;
  isDone: boolean;
  categoryId: number;
  dateAndTime: string;
  onChecked: (id: number) => void;
  author: string;
};
function ToDoItem({
  id,
  title,
  isDone,
  categoryId,
  dateAndTime,
  onChecked,
  author,
}: Props) {
  return (
    <li
      className="taskItem"
      id={String(id)}
      style={{ textDecoration: isDone ? "line-through" : "none" }}
    >
      <div
        className="category"
        style={{ backgroundColor: CategoryColors[categoryId] }}
      ></div>
      <span>{title}</span>

      <span>{author} </span>

      <span>{dateAndTime}</span>

      {/* <CircularCheckbox id={id} onChecked={onChecked} isChecked={false} /> */}
      <input
        className="checkBox"
        type="checkbox"
        onClick={() => onChecked(id)}
      />
    </li>
  );
}

export default ToDoItem;
