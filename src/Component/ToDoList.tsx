import React from "react";
import { TaskItem } from "../types/TaskItem";
import ToDoItem from "./ToDoItem";
import { Authors } from "../types/Authors";
import { authorsItems } from "../data/authorsItems";
import axios from "axios";

const getToggleButton = async (selectId: string) => {
  try {
    console.log("in api" + selectId);
    const url = "http://34.41.198.14:3002/api/task/" + selectId + "/toggleDone";
    const result = await axios.get(url);

    return result.data.data;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
    return [];
  }
};
function ToDoList({
  items,
  setItems,
}: {
  items: TaskItem[];
  setItems: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}): React.JSX.Element {
  async function handleCheck(selectId: string) {
    const newItem: TaskItem = await getToggleButton(selectId);
    window.location.reload();
    // setItems((items) => {
    //   return [...items, newItem];
    // });
    // setItems((prevItems) => {
    //   console.log(prevItems);
    //   return prevItems.map((item: TaskItem) => {
    //     if (item.id === selectId) {
    //       return { ...item, isDone: !item.isDone };
    //     }

    //     return item; // Return unchanged items
    //   });
    // });
  }
  return (
    <ul className="taskBox">
      {items.map((item: TaskItem) => {
        return (
          <ToDoItem
            item={item}
            key={item.id}
            onChecked={handleCheck}
            author={
              authorsItems.find(
                (option: Authors) => option.id === item.authorId
              )?.name || "Default Author"
            }
          />
        );
      })}
    </ul>
  );
}

export default ToDoList;
