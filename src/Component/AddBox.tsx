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
import LoadingSpinnerComponent from "react-spinners-components";

type DirtyType = {
  title: boolean;
  author: boolean;
  isAddFired: boolean;
};

let authorsItems: Authors[] | undefined;
const getAuthorsItems = async () => {
  try {
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
    const result = await axios.get(baseUrl + "authors");
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

  const [dirty, setDirty] = useState<DirtyType>({
    title: false,
    author: false,
    isAddFired: false,
  });
  let containerStyle;
  let showError = false;
  const isAllCategory = activeCategoryId === 0;
  const [currentItem, setCurrentItem] = useState<TaskItem>(initTask);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption("Select author");
  }, []);

  function checkValidation(dirty: DirtyType, currentItem: TaskItem) {
    setErrorList([]);
    const errorListLocal = [];

    const preConditionTitle = dirty.isAddFired || dirty.title;
    const preConditionAuthor = dirty.isAddFired || dirty.author;

    if (preConditionTitle && currentItem.title === "") {
      errorListLocal.push("Title is required");
    }
    if (preConditionAuthor && currentItem.authorId === -1) {
      errorListLocal.push("Author is required");
    }
    setErrorList(errorListLocal);
    return errorListLocal;
  }

  function onTitleChange(event: any) {
    const { name, value } = event.target;
    const dirtyLocal = {
      ...dirty,
      title: true,
    };
    setDirty(dirtyLocal);

    const currentItemLocal = {
      ...currentItem,
      [name]: value,
    };
    setCurrentItem(currentItemLocal);
    checkValidation(dirtyLocal, currentItemLocal);
  }

  function onAuthorChange(event: any) {
    const selectIndex: number = event.target.selectedIndex;
    const authorSelect: Authors | undefined = authorsItems?.find(
      (option, index) => index === selectIndex
    );
    let idSelect: number;
    if (authorSelect) {
      idSelect = authorSelect.id;
    }

    const currentItemLocal = {
      ...currentItem,
      authorId: authorSelect?.id || -1,
    };
    setCurrentItem(currentItemLocal);

    const dirtyLocal = {
      ...dirty,
      author: true,
    };
    setDirty(dirtyLocal);

    checkValidation(dirtyLocal, currentItemLocal);
  }

  function reset() {
    setCurrentItem(initTask);
    setDirty({
      title: false,
      author: false,
      isAddFired: false,
    });
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
      const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
      const response = await axios.post(baseUrl + "task", newTask);
      return response.data.data;
    } catch (error) {
      const typedError = error as Error;
      console.error("Error:", typedError.message);
    }
  };

  async function onAddBtnClick() {
    setErrorList([]);

    const creationDate = Math.floor(new Date().getTime() / 1000);

    const dirtyLocal = {
      ...dirty,
      addFired: true,
    };
    setDirty(dirtyLocal);
    const errorListLocal = checkValidation(dirtyLocal, currentItem);

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
          onChange={onTitleChange}
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
          onChange={onAuthorChange}
        >
          <option id="-1" value="Select author">
            Select author
          </option>
          {authorsItems?.map((option: Authors) => (
            <option key={option.id} id={String(option.id)} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <button
          className="addButton"
          onClick={(event) => onAddBtnClick()}
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
