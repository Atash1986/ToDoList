import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import { initTask } from "../data/initTask";
import "./AddBox.css";

import { addTask } from "../apis/task";

type DirtyType = {
  title: boolean;
  author: boolean;
  isAddFired: boolean;
};

function AddBox({
  activeCategoryId,
  addNewItemToState,
  authorsItems,
}: // itemId,
// setItemId,

// items,
{
  activeCategoryId: number;
  addNewItemToState: any;
  authorsItems: Authors[];
  // itemId: number;
  // setItemId: (itemId: number) => void;

  // items: TaskItem[];
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

  function onTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
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
    const selectedAuthorValue: number = parseInt(event.target.value, 10);
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

  async function onAddBtnClick() {
    setErrorList([]);

    const dirtyLocal: DirtyType = {
      ...dirty,
      isAddFired: true,
    };
    setDirty(dirtyLocal);
    const errorListLocal = checkValidation(dirtyLocal, currentItem);

    if (errorListLocal.length === 0) {
      // setItemId(itemId + 1);

      const newItem: TaskItem | null = await addTask(
        activeCategoryId,
        currentItem.title,
        currentItem.author.id
      );
      if (newItem !== null) {
        addNewItemToState(newItem);
      }
    } else {
      return;
    }
    reset();
  }

  return (
    <div className="addBoxContainer" data-testid="add-box-container">
      <Tooltip id="my-tooltip" data-testid="add-box-tooltip" />
      <div className="addBox">
        <input
          data-testid="add-box-title"
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
          data-testid="add-box-author"
          value={currentItem.author?.id || -1}
          disabled={isAllCategory}
          name={
            authorsItems?.find(
              (option: Authors) => option.id === currentItem.author.id
            )?.name || "Default Value"
          }
          onChange={onAuthorChange}
        >
          <option value={-1}>Select an author</option>
          {authorsItems?.map((option: Authors) => (
            <option key={option.id} id={String(option.id)} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <button
          data-testid="add-box-add-button"
          className="addButton"
          onClick={onAddBtnClick}
          disabled={isAllCategory}
          style={{ cursor: isAllCategory ? "not-allowed" : "pointer" }}
        >
          <img src="plus.svg" />
        </button>
        <br />
      </div>

      <div className="errorRequirement">
        <span data-testid="add-box-error-box">
          {errorList.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </span>
      </div>
    </div>
  );
}
export default AddBox;
