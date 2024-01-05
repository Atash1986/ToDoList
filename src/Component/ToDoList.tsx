import React from "react";
import { TaskItem } from "../types/TaskItem";
import ToDoItem from "./ToDoItem";
import { Authors } from "../types/Authors";
import axios from "axios";
import MainPage from "./MainPage";
import { baseUrl } from "../apis/core";

const getToggleButton = async (selectId: string) => {
  try {
    const url = baseUrl + "task/" + selectId + "/toggleDone";
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
  toggleTask,
}: {
  toggleTask: (item: TaskItem) => TaskItem[] | void;
  items: TaskItem[];
  setItems: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}): React.JSX.Element {
  async function handleCheck(selectId: string) {
    const item: TaskItem = await getToggleButton(selectId);
    const selectedItem: TaskItem | undefined = items.find(
      (item: TaskItem) => item.id == selectId
    );
    const colorSelectedItem = selectedItem!.categoryItem.color;
    const idSelectedItem = selectedItem!.categoryItem.id;
    item.categoryItem = { id: idSelectedItem, color: colorSelectedItem };
    toggleTask(item);
  }

  return (
    <ul className="taskBox">
      {items.map((item: TaskItem) => {
        return <ToDoItem item={item} key={item.id} onChecked={handleCheck} />;
      })}
    </ul>
  );
}

export default ToDoList;
