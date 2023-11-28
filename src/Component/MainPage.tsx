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
import ToDoLists from "./ToDoLists";
import categories from "../data/categories";

function ToDoList({ activeCategoryId }: { activeCategoryId: number }) {
  const [items, setItems] = useState<TaskItem[]>(taskItems);
  const [lastItemId, setLastItemId] = useState<number>(-1);
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  let numberOfActive: number = 0;
  let numberOfDone: number = 0;
  const numberOfCategory: number = categories.length;
  useEffect(() => {
    if (taskItems.length > 0) {
      // Get the maximum id from taskItems
      const maxId = Math.max(...taskItems.map((item) => item.id));
      setLastItemId(maxId + 1);
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

  const isAllCategory = activeCategoryId === 0;
  const filterItems: TaskItem[] = items.filter(
    (item: TaskItem) =>
      !item.isDone && (item.categoryId === activeCategoryId || isAllCategory)
  );
  numberOfActive = filterItems.length;
  const filterItemsDone: TaskItem[] = items.filter(
    (item: TaskItem) =>
      item.isDone && (item.categoryId === activeCategoryId || isAllCategory)
  );
  numberOfDone = filterItemsDone.length;

  return (
    <div>
      <div className="statisticsBox">
        <div className="statisticsDetail">
          <span className="number">{numberOfActive}</span>
          <span className="name">Active Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{numberOfDone}</span>
          <span className="name">Done Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{numberOfCategory}</span>
          <span className="name">Categories</span>
        </div>
      </div>
      <AddBox
        activeCategoryId={activeCategoryId}
        itemId={lastItemId}
        setItems={setItems}
        setItemId={setLastItemId}
        items={items}
      />
      <div>
        <ToDoLists
          filterItems={filterItems}
          setItems={setItems}
          // items={items}
        />

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
            <ToDoLists
              filterItems={filterItemsDone}
              setItems={setItems}
              // items={items}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
