import React, { useState, useEffect, MouseEvent } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import taskItems from "../data/taskItems";
import { authorsItems } from "../data/authorsItems";
import { taskItem } from "../types/TaskItem";
import { authors } from "../types/Authors";
import * as MyPlus from "../assest/image/plus.svg";

function ToDoList({ activeCategoryId }: { activeCategoryId: number }) {
  const [items, setItems] = useState<taskItem[]>(taskItems);
  const [itemId, setItemId] = useState<number>(-1);
  const [isDivVisible, setDivVisible] = useState<boolean>(false);

  useEffect(() => {
    if (taskItems.length > 0) {
      // Get the maximum id from taskItems
      const maxId = Math.max(...taskItems.map((item) => item.id));
      setItemId(maxId + 1);
    }
  }, [taskItems]);
  const [currentItem, setCurrentItem] = useState<taskItem>({
    title: "",
    id: -1,
    dateAndTime: "2023",
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
    const authorSelect: authors | undefined = authorsItems.find(
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
      return prevItems.map((item: taskItem) => {
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
      dateAndTime: "",
      authorId: -1,
      categoryId: 0,
    }));
  }
  function addItem() {
    const currentDT: Date = new Date();
    const dateTime: string = currentDT.toLocaleString();
    setItemId(itemId + 1);

    setItems((prevItems) => {
      const newItem = {
        ...currentItem,
        dateAndTime: dateTime,
        id: itemId,
        categoryId: activeCategoryId,
      };

      return [...prevItems, newItem];
    });
    reset();
  }

  return (
    <div>
      <div className="addBox">
        <input
          className="taskTitle"
          type="text"
          name="title"
          value={currentItem.title}
          onChange={handleChange}
        />
        <br />

        <select
          name="author"
          value={
            authorsItems.find(
              (option: authors) => option.id === currentItem.authorId
            )?.value || "Default Value"
          }
          onChange={handleSelect}
        >
          {authorsItems.map((option: authors) => (
            <option key={option.id} id={String(option.id)} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button className="addButton" onClick={(event) => addItem()}>
          <img src="plus.svg" />
          {/* <MyPlus /> */}
        </button>
        <br />
      </div>
      <div>
        <ul className="taskBox">
          {items
            .filter(
              (item: taskItem) =>
                !item.isDone &&
                (item.categoryId === activeCategoryId || activeCategoryId === 0)
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
                  dateAndTime={item.dateAndTime}
                  onChecked={handleCheck}
                  author={
                    authorsItems.find(
                      (option: authors) => option.id === item.authorId
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

          {isDivVisible && (
            <div className="taskDoneItem">
              {items
                .filter(
                  (item: taskItem) =>
                    item.isDone &&
                    (item.categoryId === activeCategoryId ||
                      activeCategoryId === 0)
                )
                .map((item: taskItem) => {
                  if (item.isDone === true) {
                    return (
                      <ToDoItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        isDone={item.isDone}
                        dateAndTime={item.dateAndTime}
                        onChecked={handleCheck}
                        author={
                          authorsItems.find(
                            (option: authors) => option.id === item.authorId
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
