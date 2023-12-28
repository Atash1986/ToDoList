import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import taskItems from "../data/taskItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import { initTask } from "../data/initTask";
import { removeItemsWithValue } from "../util/itemHelpers";
import "./AddBox.css";
import { getFormatedDateTime } from "../util/dateHelpers";
import axios from "axios";
import { error } from "console";
let authorsItems: Authors[] | undefined;
const getAuthorsItems = async () => {
  try {
    const result = await axios.get("http://34.41.198.14:3002/api/authors");
    authorsItems = result.data.data;
    return authorsItems;
  } catch (error) {
    const typedError = error as Error;
    console.error("Error:", typedError.message);
  }
};

(async () => {
  authorsItems = await getAuthorsItems();
})();

function AddBox({
  activeCategoryId,
  itemId,
  setItemId,
  setItems,
  items,
}: {
  activeCategoryId: number;
  itemId: number;
  setItemId: (itemId: number) => void;
  setItems: Dispatch<SetStateAction<TaskItem[]>>;
  items: TaskItem[];
}) {
  const [errorList, setErrorList] = useState<string[]>([]);

  let containerStyle;
  let showError = false;
  const isAllCategory = activeCategoryId === 0;
  const [currentItem, setCurrentItem] = useState<TaskItem>(initTask);

  function checkValidation() {
    setErrorList([]);
    const errorListLocal = [];

    if (currentItem.title === "") {
      errorListLocal.push("Title is required");
    }
    if (currentItem.authorId === -1) {
      errorListLocal.push("Author is required");
    }
    setErrorList(errorListLocal);
    return errorListLocal;
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    checkValidation();

    setCurrentItem((prevInputText) => ({
      ...prevInputText,

      [name]: value,
    }));
  }
  function handleSelect(event: any) {
    checkValidation();
    const selectIndex: number = event.target.selectedIndex;
    const authorSelect: Authors | undefined = authorsItems?.find(
      (option, index) => index === selectIndex
    );
    let idSelect: number;
    if (authorSelect) {
      idSelect = authorSelect.id;
    }

    setCurrentItem((prevCurrentItem) => ({
      ...prevCurrentItem,
      authorId: idSelect,
    }));
  }
  function reset() {
    setCurrentItem(initTask);
  }
  const newTask = {
    categoryId: activeCategoryId,
    title: currentItem.title,
    authorId: currentItem.authorId,
  };
  // const jsonNewTask = JSON.stringify(newTask);
  const addTask = async () => {
    // console.log(jsonNewTask);
    try {
      const response = await axios.post(
        "http://34.41.198.14:3002/api/task",
        newTask
      );
      return response.data.data;
    } catch (error) {
      const typedError = error as Error;
      console.error("Error:", typedError.message);
    }
  };
  async function addItem() {
    setErrorList([]);

    const creationDate = Math.floor(new Date().getTime() / 1000);

    const errorListLocal = checkValidation();

    if (errorListLocal.length === 0) {
      setItemId(itemId + 1);

      const newItem: TaskItem = await addTask();
      setItems((prevItems: TaskItem[]) => {
        return [...prevItems, newItem];
      });
    } else {
      return;
    }
    reset();
  }

  return (
    <div>
      <Tooltip id="my-tooltip" />
      <div className="addBox">
        <input
          disabled={isAllCategory}
          className="taskTitle"
          type="text"
          name="title"
          value={currentItem.title}
          onChange={handleChange}
          data-tooltip-id={isAllCategory ? "my-tooltip" : ""}
          data-tooltip-content={
            isAllCategory ? "You Must First Select One Category Item" : ""
          }
        />

        <select
          disabled={isAllCategory}
          name={
            authorsItems?.find(
              (option: Authors) => option.id === currentItem.authorId
            )?.name || "Default Value"
          }
          onChange={handleSelect}
        >
          {authorsItems?.map((option: Authors) => (
            <option key={option.id} id={String(option.id)} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <button
          className="addButton"
          onClick={(event) => addItem()}
          disabled={isAllCategory}
          style={{ cursor: isAllCategory ? "not-allowed" : "pointer" }}
        >
          <img src="plus.svg" />
        </button>
        <br />
      </div>

      <div className="errorRequirement">
        <span>
          {errorList.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
export default AddBox;
