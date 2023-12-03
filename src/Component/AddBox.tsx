import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [errorList, setErrorList] = useState<string[]>([]);

  const initializ: TaskItem = {
    title: "",
    id: -1,
    dateAndTime: { date: "2023", time: "14:30" },
    isDone: false,
    authorId: -1,
    categoryId: 0,
  };
  let containerStyle;
  let showError = false;
  const isAllCategory = activeCategoryId === 0;
  const [currentItem, setCurrentItem] = useState<TaskItem>(initializ);
  // const [showError, setShowError] = useState<boolean>(false);
  function removeItemsWithValue(errorMessage: String) {
    const newArray = errorList.filter((item) => item !== errorMessage);
    setErrorList(newArray);
  }
  function handleChange(event: any) {
    const { name, value } = event.target;
    // setShowError(false);

    if (currentItem.title !== "") {
      removeItemsWithValue("Add Title");
    }
    // else errorList.push("Please add tiltle");

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
      if (idSelect !== -1) {
        removeItemsWithValue("Add Select");
      }
    }

    setCurrentItem((prevCurrentItem) => ({
      ...prevCurrentItem,
      authorId: idSelect,
    }));
  }
  function reset() {
    setCurrentItem(initializ);
  }
  // setErrorList([...errorList, "Add Select"]);
  // const errorListCopy = [...errorList];
  // errorListCopy.push("Add Select");
  // setErrorList(errorListCopy);

  // setErrorList((prevErrorList) => {
  //   console.log("Previous Error List:", prevErrorList);
  //   const newErrorList = [...prevErrorList, "Add Select"];
  //   console.log("New Error List:", newErrorList);
  //   return newErrorList;
  // });

  function addItem() {
    setErrorList([]);

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

    const errorListLocal = [];

    if (currentItem.title === "") {
      errorListLocal.push("Add Title");
      // setErrorList((errorList) => [...errorList, "Add Title"]);
    }
    if (currentItem.authorId === -1) {
      errorListLocal.push("Add Select");
    }
    setErrorList(errorListLocal);
    if (errorListLocal.length === 0) {
      setItemId(itemId + 1);

      setItems((prevItems: TaskItem[]) => {
        const newItem = {
          ...currentItem,
          dateAndTime: { date, time },
          id: itemId,
          categoryId: activeCategoryId,
        };

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
