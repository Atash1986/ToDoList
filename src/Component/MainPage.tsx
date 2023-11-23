import React, { useState, useEffect, MouseEvent } from "react";
import ToDoItem from "./ToDoItem";
import "./MainPage.css";
import taskItems from "../data/taskItems";
import { authorsItems } from "../data/authorsItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import * as MyPlus from "../assest/image/plus.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import AddBox from "./AddBox";

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

  function handleClickDone(event: any) {
    setDivVisible(!isDivVisible);
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

  const isAllCategory = activeCategoryId === 0;
  return (
    <div>
      <AddBox
        activeCategoryId={activeCategoryId}
        itemId={itemId}
        setItems={setItems}
        setItemId={setItemId}
        items={items}
      />
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
