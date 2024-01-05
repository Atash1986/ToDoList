import React, { Dispatch, SetStateAction, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import { initTask } from "../data/initTask";
import "./AddBox.css";
import axios from "axios";
import { baseUrl } from "../apis/core";
import { getAuthorsItems } from "../apis/author";
import { addTask } from "../apis/task";

type DirtyType = {
  title: boolean;
  author: boolean;
  isAddFired: boolean;
};

let authorsItems: Authors[] | undefined;
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
  const isAllCategory = activeCategoryId === 0;
  const [currentItem, setCurrentItem] = useState<TaskItem>(initTask);
  function checkValidation(dirty: DirtyType, currentItem: TaskItem) {
    setErrorList([]);
    const errorListLocal = [];

    const preConditionTitle = dirty.isAddFired || dirty.title;
    const preConditionAuthor = dirty.isAddFired || dirty.author;

    if (preConditionTitle && currentItem.title === "") {
      errorListLocal.push("Title is required");
    }
    if (preConditionAuthor && currentItem.author.id === -1) {
      errorListLocal.push("Author is required");
    }
    setErrorList(errorListLocal);
    return errorListLocal;
  }

  function onTitleChange(event: any) {
    const { name, value } = event.target;
    const dirtyLocal: DirtyType = {
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
    const selectedAuthorValue: number = event.target.value;
    const authorSelected: Authors | undefined = authorsItems?.find(
      (option) => option.id == selectedAuthorValue
    );

    const currentItemLocal: TaskItem = {
      ...currentItem,
      author: {
        ...currentItem.author,
        id: authorSelected?.id || -1,
      },
    };
    setCurrentItem(currentItemLocal);

    const dirtyLocal: DirtyType = {
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
  const newTaskBody = {
    categoryId: activeCategoryId,
    title: currentItem.title,
    authorId: currentItem.author.id,
  };

  async function onAddBtnClick() {
    setErrorList([]);

    const creationDate = Math.floor(new Date().getTime() / 1000);

    const dirtyLocal: DirtyType = {
      ...dirty,
      isAddFired: true,
    };
    setDirty(dirtyLocal);
    const errorListLocal = checkValidation(dirtyLocal, currentItem);

    if (errorListLocal.length === 0) {
      setItemId(itemId + 1);

      const newItem: TaskItem | null = await addTask(newTaskBody);
      if (newItem !== null) {
        setItems((prevItems: TaskItem[]) => {
          return [...prevItems, newItem];
        });
      }
    } else {
      return;
    }
    reset();
  }

  return (
    <div className="addBoxContainer">
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
          value={currentItem.author?.id || -1}
          disabled={isAllCategory}
          name={
            authorsItems?.find(
              (option: Authors) => option.id === currentItem.author.id
            )?.name || "Default Value"
          }
          onChange={onAuthorChange}
        >
          <option id="-1" value={-1}>
            Select author
          </option>
          {authorsItems?.map((option: Authors) => (
            <option key={option.id} id={String(option.id)} value={option.id}>
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
