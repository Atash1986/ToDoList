import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { TaskItem } from "../types/TaskItem";
import "react-tooltip/dist/react-tooltip.css";
import AddBox from "./AddBox";
import ToDoList from "./ToDoList";
import { ToggleButton } from "./ToggleButton";
import NoDataImage from "../assest/image/no-data.png";
import LoadingSpinnerComponent from "react-spinners-components";
import { getActiveItems, getDoneItems } from "../apis/task";

function MainPage({ activeCategoryId }: { activeCategoryId: number }) {
  const [lastItemId, setLastItemId] = useState<number>(-1);
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeItems, setActiveItems] = useState<TaskItem[]>([]);
  const [doneItems, setDoneItems] = useState<TaskItem[]>([]);
  const isAllCategory = activeCategoryId === 0;

  function toggleTask(item: TaskItem): TaskItem[] | void {
    if (item.isDone === true) {
      setActiveItems((activeItems) => {
        return activeItems.filter(
          (activeItem: TaskItem) => activeItem.id !== item.id
        );
      });
      return setDoneItems([...doneItems, item]);
    } else {
      setDoneItems((doneItems) => {
        return doneItems.filter(
          (doneItem: TaskItem) => doneItem.id !== item.id
        );
      });
      return setActiveItems([...activeItems, item]);
    }
  }

  const filterByCategory = (items: TaskItem[]) => {
    return items.filter(
      (item: TaskItem) =>
        item.categoryItem.id === activeCategoryId || isAllCategory
    );
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedItems = await getActiveItems();
      setIsLoading(false);
      const filteredData = filterByCategory(fetchedItems.data);
      setActiveItems(filteredData);
    })();
  }, [activeCategoryId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedItems = await getDoneItems();
      setIsLoading(false);
      const filteredData = filterByCategory(fetchedItems.data);
      setDoneItems(filteredData);
    })();
  }, [activeCategoryId]);

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
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
