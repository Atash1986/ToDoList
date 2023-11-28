import React from "react";
import { TaskItem } from "../types/TaskItem";
import ToDoItem from "./ToDoItem";
import { Authors } from "../types/Authors";
import { authorsItems } from "../data/authorsItems";
function ToDoList({
  filterItems,
  setItems,
}: // items,
{
  filterItems: TaskItem[];
  setItems: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  //  items: TaskItem[];
}): React.JSX.Element {
  function handleCheck(selectId: number) {
    setItems((prevItems) => {
      return prevItems.map((item: TaskItem) => {
        if (item.id === selectId) {
          return { ...item, isDone: !item.isDone };
        }

        return item; // Return unchanged items
      });
    });
  }
  return (
    <ul className="taskBox">
      {filterItems.map((item: TaskItem) => {
        return (
          <ToDoItem
            item={item}
            key={item.id}
            // id={item.id}
            // title={item.title}
            // isDone={item.isDone}
            // categoryId={item.categoryId}
            // date={item.dateAndTime.date}
            // time={item.dateAndTime.time}
            onChecked={handleCheck}
            author={
              authorsItems.find(
                (option: Authors) => option.id === item.authorId
              )?.label || "Default Author"
            }
          />
        );
      })}
    </ul>
  );
}

export default ToDoList;
