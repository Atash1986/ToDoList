import React, { useState, useEffect, MouseEvent } from "react";
import ToDoItem from "./ToDoItem";
import "./MainPage.css";
// import taskItems from "../data/taskItems";
// import { authorsItems } from "../data/authorsItems";
import { TaskItem } from "../types/TaskItem";
import { Authors } from "../types/Authors";
import * as MyPlus from "../assest/image/plus.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import AddBox from "./AddBox";
import ToDoList from "./ToDoList";
import { ToggleButton } from "./ToggleButton";
import NoDataImage from "../assest/image/no-data.png";
import axios from "axios";
import LoadingSpinnerComponent from "react-spinners-components";

function MainPage({ activeCategoryId }: { activeCategoryId: number }) {
  const [lastItemId, setLastItemId] = useState<number>(-1);
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeItems, setActiveItems] = useState<TaskItem[]>([]);
  const [doneItems, setDoneItems] = useState<TaskItem[]>([]);
  const isAllCategory = activeCategoryId === 0;

  function toggleTask(item: TaskItem): TaskItem[] | void {
    if (item.isDone === true) {
      // const selectedItem: TaskItem | undefined = activeItems.find(
      //   (activeItem: TaskItem) => item.id === activeItem.id
      // );
      // selectedItem ? (selectedItem.isDone = true) : "";
      setActiveItems((activeItems) => {
        return activeItems.filter(
          (activeItem: TaskItem) => activeItem.id !== item.id
        );
      });
      return setDoneItems([...doneItems, item]);
    } else {
      // const selectedItem: TaskItem | undefined = doneItems.find(
      //   (doneItem: TaskItem) => item.id === doneItem.id
      // );
      // selectedItem ? (selectedItem.isDone = false) : "";
      setDoneItems((doneItems) => {
        return doneItems.filter(
          (doneItem: TaskItem) => doneItem.id !== item.id
        );
      });
      return setActiveItems([...activeItems, item]);
    }
    //   }
  }
  const getActiveItems = async () => {
    setIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
    const result = await axios.get(baseUrl + "tasks?isDone=false");
    setIsLoading(false);

    return result.data;
  };

  const getDoneItems = async () => {
    setIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
    const result = await axios.get(baseUrl + "tasks?isDone=true");
    setIsLoading(false);
    return result.data;
  };
  // const getTasks = async () => {
  //   setIsLoading(true);
  //   const baseUrl = process.env.REACT_APP_API_BASE_URL || "";
  //   const result = await axios.get(baseUrl + "tasks");
  //   setIsLoading(false);

  //   return result.data;
  // };
  const filterByCategory = (items: TaskItem[]) => {
    return items.filter(
      (item: TaskItem) =>
        item.categoryItem.id === activeCategoryId || isAllCategory
    );
  };
  useEffect(() => {
    (async () => {
      const fetchedItems = await getActiveItems();
      const filteredData = filterByCategory(fetchedItems.data);
      setActiveItems(filteredData);
      // filterTasks(fetchedItems.data);
    })();
  }, [activeCategoryId]);
  useEffect(() => {
    (async () => {
      const fetchedItems = await getDoneItems();
      const filteredData = filterByCategory(fetchedItems.data);
      setDoneItems(filteredData);
      // filterTasks(fetchedItems.data);
    })();
  }, [activeCategoryId]);

  // useEffect(() => {
  //   if (taskItems.length > 0) {
  //     // Get the maximum id from taskItems
  //     const maxId = Math.max(...taskItems.map((item) => item.id));
  //     setLastItemId(maxId + 1);
  //   }
  // }, [taskItems]);

  return (
    <div className="contentTasks">
      <div className="statisticsBox">
        <div className="statisticsDetail">
          <span className="number">{activeItems.length}</span>
          <span className="name">Active Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{doneItems.length}</span>
          <span className="name">Done Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{3}</span>
          <span className="name">Categories</span>
        </div>
      </div>
      <AddBox
        activeCategoryId={activeCategoryId}
        itemId={lastItemId}
        setItems={setActiveItems}
        setItemId={setLastItemId}
        items={activeItems}
      />
      <div>
        {isLoading === true && (
          <LoadingSpinnerComponent
            type={"Blocks"}
            colors={["#06628d", "#f91a10"]}
            size={"100px"}
          />
        )}
        {isLoading === false && activeItems.length === 0 && (
          <img className="noDataImage" src={NoDataImage} />
        )}
        {isLoading === false && activeItems.length > 0 && (
          <ToDoList
            items={activeItems}
            setItems={setActiveItems}
            toggleTask={toggleTask}
            // isDone="false"
            // otherItem={doneItems}
            // setOtherItem={setDoneItems}
          />
        )}

        <ToggleButton
          isDivVisible={isDivVisible}
          setDivVisible={setDivVisible}
        />

        {isDivVisible && (
          <div className="taskDoneItem">
            <ToDoList
              items={doneItems}
              setItems={setDoneItems}
              toggleTask={toggleTask}
              // isDone="true"
              // otherItem={activeItems}
              // setOtherItem={setActiveItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
