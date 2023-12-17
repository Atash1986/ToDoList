import React from "react";
import { TaskItem } from "../types/TaskItem";
import ToDoItem from "./ToDoItem";
import { Authors } from "../types/Authors";
import { authorsItems } from "../data/authorsItems";
import NoData from "../assest/image/no-data.png";
function ToDoList({
  items,
  setItems,
}: {
  items: TaskItem[];
  setItems: React.Dispatch<React.SetStateAction<TaskItem[]>>;
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
      {
        items.map((item: TaskItem) => {
          return (
            <ToDoItem
              item={item}
              key={item.id}
              onChecked={handleCheck}
              author={
                authorsItems.find(
                  (option: Authors) => option.id === item.authorId
                )?.label || "Default Author"
              }
            />
          );
        })
        // : (console.log(items), (<img src={NoData} />))
      }
    </ul>
  );
}

export default ToDoList;
