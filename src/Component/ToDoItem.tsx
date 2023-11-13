import React, { MouseEvent } from "react";
import "./ToDoItem.css";
import CategoryItem from "./CategoryItem";
import { Category } from "../types/category";
import categories from "../data/Categories";
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
        style={{
          backgroundColor:
            categories.find((category: Category) => category.id === categoryId)
              ?.color || "white",
        }}
      ></div>
      <span className="taskItemTitle">{title}</span>

      <span className="taskAuthor">{author} </span>

      <span className="taskDate">{dateAndTime}</span>

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
