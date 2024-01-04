import React from "react";
import { TaskItem } from "../types/TaskItem";
import ToDoItem from "./ToDoItem";
import { Authors } from "../types/Authors";
import axios from "axios";
import MainPage from "./MainPage";

const getToggleButton = async (selectId: string) => {
  try {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
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
}: // isDone,
// setOtherItem,
// otherItem,
{
  // isDone: String;
  // setOtherItem: React.Dispatch<React.SetStateAction<TaskItem[]>>;
  // otherItem: TaskItem[];
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

  //   {

  //       setItems((items) => {
  //         const newItems = items.filter(
  //           (item: TaskItem) => item.isDone === false
  //         );
  //         return newItems;
  //       });

  //       setOtherItem([...items, newItem]);
  //     } else {
  //       setItems((items) => {
  //         const newItems = items.filter(
  //           (item: TaskItem) => item.isDone === true
  //         );
  //         return newItems;
  //       });
  //       setOtherItem([...items, newItem]);
  //     }
  //   }
  //   // newItem.isDone? (setItems((items) => {
  //   //     const newItem2=items.filter((item: TaskItem) =>
  //   //     item.id===selectId)
  //   //      return [...items, newItem2];
  //   //    });):
  //   // window.location.reload();
  //   // setItems((items) => {
  //   //   const newItem2=items.filter((item: TaskItem) =>
  //   //  item.id===selectId)
  //   //   return [...items, newItem2];
  //   // });
  //   // setItems((prevItems) => {
  //   //   console.log(prevItems);
  //   //   return prevItems.map((item: TaskItem) => {
  //   //     if (item.id === selectId) {
  //   //       return { ...item, isDone: !item.isDone };
  //   //     }

  //   return newItem; // Return unchanged items
  //   //   });
  //   // });

  return (
    <ul className="taskBox">
      {items.map((item: TaskItem) => {
        return (
          <ToDoItem
            item={item}
            key={item.id}
            onChecked={handleCheck}
            // author={
            //   authorsItems.find(
            //     (option: Authors) => option.id === item.author.id
            //   )?.name || "Default Author"
            // }
          />
        );
      })}
    </ul>
  );
}

export default ToDoList;
