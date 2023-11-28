import React, { Dispatch, SetStateAction, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import taskItems from "../data/taskItems";
import { authorsItems } from "../data/authorsItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import "./AddBox.css";
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
  const initializ: TaskItem = {
    title: "",
    id: -1,
    dateAndTime: { date: "2023", time: "14:30" },
    isDone: false,
    authorId: -1,
    categoryId: 0,
  };
  const isAllCategory = activeCategoryId === 0;
  const [currentItem, setCurrentItem] = useState<TaskItem>(initializ);
  const [showError, setShowError] = useState<boolean>(false);
  function handleChange(event: any) {
    const { name, value } = event.target;

    setCurrentItem((prevInputText) => ({
      ...prevInputText,

      [name]: value,
    }));
  }
  function handleSelect(event: any) {
    const selectIndex: number = event.target.selectedIndex;
    const authorSelect: Authors | undefined = authorsItems.find(
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
    setCurrentItem(initializ);
    setShowError(false);
  }
  function addItem() {
    const dateObject: Date = new Date();
    const day = dateObject.getDate();
    const hour = dateObject.getHours();
    const minute = dateObject.getMinutes();
    const dayName: string = dateObject.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const monthName: string = dateObject.toLocaleDateString("en-US", {
      month: "long",
    });
    const date = dayName + "," + day + " " + monthName.slice(0, 3);
    const time: string = hour + ":" + minute;

    setItemId(itemId + 1);

    setItems((prevItems: TaskItem[]) => {
      if (currentItem.title !== "") {
        const newItem = {
          ...currentItem,
          dateAndTime: { date, time },
          id: itemId,
          categoryId: activeCategoryId,
        };

        return [...prevItems, newItem];
      } else {
        setShowError(true);
        return prevItems;
      }
    });
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
          name="author"
          value={
            authorsItems.find(
              (option: Authors) => option.id === currentItem.authorId
            )?.value || "Default Value"
          }
          onChange={handleSelect}
        >
          {authorsItems.map((option: Authors) => (
            <option key={option.id} id={String(option.id)} value={option.value}>
              {option.label}
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
          {/* <MyPlus /> */}
        </button>
        <br />
      </div>
      <span
        className="errorRequirement"
        style={{ display: showError ? "block" : "none" }}
      >
        Please Add Title For Task
      </span>
    </div>
  );
}
export default AddBox;
