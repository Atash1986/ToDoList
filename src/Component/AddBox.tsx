import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import taskItems from "../data/taskItems";
import { authorsItems } from "../data/authorsItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import { initTask } from "../data/initTask";
import { removeItemsWithValue } from "../util/itemHelpers";
import "./AddBox.css";
import { getFormatedDateTime } from "../util/dateHelpers";
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
  // const [showError, setShowError] = useState<boolean>(false);
  // function removeItemsWithValue(errorMessage: String) {
  //   const newArray = errorList.filter((item) => item !== errorMessage);
  //   setErrorList(newArray);
  // }
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
  }

  function handleChange(event: any) {
    const { name, value } = event.target;
    checkValidation();

    // if (currentItem.title !== "") {
    //   removeItemsWithValue("Add Title", errorList, setErrorList);
    // }
    // else errorList.push("Please add tiltle");

    setCurrentItem((prevInputText) => ({
      ...prevInputText,

      [name]: value,
    }));
  }
  function handleSelect(event: any) {
    checkValidation();
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
    setCurrentItem(initTask);
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

    const dateTime = getFormatedDateTime();

    const errorListLocal = [];

    checkValidation();

    // if (currentItem.title === "") {
    //   errorListLocal.push("Add Title");
    //   // setErrorList((errorList) => [...errorList, "Add Title"]);
    // }
    // if (currentItem.authorId === -1) {
    //   errorListLocal.push("Add Select");
    // }
    // setErrorList(errorListLocal);

    if (errorList.length === 0) {
      setItemId(itemId + 1);

      setItems((prevItems: TaskItem[]) => {
        const newItem = {
          ...currentItem,
          dateAndTime: { date: dateTime.date, time: dateTime.time },
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
