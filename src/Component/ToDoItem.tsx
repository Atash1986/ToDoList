import React, { MouseEvent } from "react";
import "./ToDoItem.css";
import CategoryItem from "./CategoryItem";
import { Category } from "../types/Category";
import categories from "../data/categories";
import { TaskItem } from "../types/TaskItem";
import Checkbox from "./CheckBox";

type Props = {
  item: TaskItem;
  onChecked: (id: number) => void;
  author: string;
};
function ToDoItem({ item, onChecked, author }: Props) {
  return (
    <li
      className="taskItem"
      id={String(item.id)}
      style={{ textDecoration: item.isDone ? "line-through" : "none" }}
    >
      <div
        className="category"
        style={{
          backgroundColor:
            categories.find(
              (category: Category) => category.id === item.categoryId
            )?.color || "white",
        }}
      ></div>
      <div className="titleCol">{item.title}</div>
      <div className="authorCol">{author} </div>
      <div className="dateAndTimeCol">
        <span className="taskDate">{item.dateAndTime?.date}</span>
        <span className="taskDate">{item.dateAndTime?.time}</span>
      </div>
      <Checkbox item={item} onChecked={onChecked} />
    </li>
  );
}

export default ToDoItem;
