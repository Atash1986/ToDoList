import React, { useState, useEffect, MouseEvent } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import taskItems from "../data/taskItems";
import { authorsItems } from "../data/authorsItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import * as MyPlus from "../assest/image/plus.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

function ToDoList({ activeCategoryId }: { activeCategoryId: number }) {
  const [items, setItems] = useState<TaskItem[]>(taskItems);
  const [itemId, setItemId] = useState<number>(-1);
  const [isDivVisible, setDivVisible] = useState<boolean>(false);

  useEffect(() => {
    if (taskItems.length > 0) {
      // Get the maximum id from taskItems
      const maxId = Math.max(...taskItems.map((item) => item.id));
      setItemId(maxId + 1);
    }
  }, [taskItems]);
  const [currentItem, setCurrentItem] = useState<TaskItem>({
    title: "",
    id: -1,
    dateAndTime: { date: "2023", time: "14:30" },
    isDone: false,
    authorId: -1,
    categoryId: 0,
  });

  function handleChange(event: any) {
    const { name, value } = event.target;

    setCurrentItem((prevInputText) => ({
      ...prevInputText,
      [name]: value,
    }));
  }
  function handleClickDone(event: any) {
    setDivVisible(!isDivVisible);
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

  function handleCheck(selectId: number) {
    setItems((prevItems) => {
      return prevItems.map((item: TaskItem) => {
        if (item.id === selectId) {
          return { ...item, isDone: !item.isDone };
        }

        return item; // Return unchanged items
      });
    });
  }

  function reset() {
    setCurrentItem((prevCurrentItem) => ({
      ...prevCurrentItem,
      title: "",
      dateAndTime: { date: "", time: "" },
      authorId: -1,
      categoryId: 0,
    }));
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
    const date = dayName.slice(0, 3) + "," + day + " " + monthName.slice(0, 3);

    const time: string = hour + ":" + minute;
    setItemId(itemId + 1);

    setItems((prevItems) => {
      const newItem = {
        ...currentItem,
        dateAndTime: { date, time },
        id: itemId,
        categoryId: activeCategoryId,
      };

      return [...prevItems, newItem];
    });
    reset();
  }
  const isAllCategory = activeCategoryId === 0;
  return (
    <div>
      <Tooltip id="my-tooltip" />;
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
      <div>
        <ul className="taskBox">
          {items
            .filter(
              (item: TaskItem) =>
                !item.isDone &&
                (item.categoryId === activeCategoryId || isAllCategory)
            )
            .map((item) => {
              // if(item.isDone===false)
              // {
              return (
                <ToDoItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  isDone={item.isDone}
                  categoryId={item.categoryId}
                  date={item.dateAndTime.date}
                  time={item.dateAndTime.time}
                  onChecked={handleCheck}
                  author={
                    authorsItems.find(
                      (option: Authors) => option.id === item.authorId
                    )?.label || "Default Author"
                  }
                />
              );
            })}
          <div onClick={handleClickDone} className="textTaskDone">
            {isDivVisible ? (
              <span>Hide The Completed Tasks</span>
            ) : (
              <span>Show The Completed Tasks</span>
            )}
          </div>
          <li className="sparator"></li>
          <br />
          <br />

          {isDivVisible && (
            <div className="taskDoneItem">
              {items
                .filter(
                  (item: TaskItem) =>
                    item.isDone &&
                    (item.categoryId === activeCategoryId || isAllCategory)
                )
                .map((item: TaskItem) => {
                  if (item.isDone === true) {
                    return (
                      <ToDoItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        isDone={item.isDone}
                        date={item.dateAndTime.date}
                        time={item.dateAndTime.time}
                        onChecked={handleCheck}
                        author={
                          authorsItems.find(
                            (option: Authors) => option.id === item.authorId
                          )?.label || "Default Author"
                        }
                        categoryId={item.categoryId}
                      />
                    );
                  }
                })}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
