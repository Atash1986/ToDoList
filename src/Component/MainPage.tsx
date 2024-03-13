import { useState, useEffect } from "react";
import "./MainPage.css";
import { TaskItem } from "../types/TaskItem";
import "react-tooltip/dist/react-tooltip.css";
import AddBox from "./AddBox";
import ToDoList from "./ToDoList";
import { ToggleButton } from "./ToggleButton";
import NoDataImage from "../assest/image/no-data.png";
import LoadingSpinnerComponent from "react-spinners-components";
import { getActiveItems, getDoneItems } from "../apis/task";
import { getAuthorsItems } from "../apis/author";
import { Authors } from "../types/Authors";

function MainPage({
  activeCategoryId,
  categoryLength,
}: {
  activeCategoryId: number;
  categoryLength: number;
}) {
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeItems, setActiveItems] = useState<TaskItem[]>([]);
  const [doneItems, setDoneItems] = useState<TaskItem[]>([]);
  const isAllCategory = activeCategoryId === 0;

  function addNewItemToState(newItem: TaskItem) {
    setActiveItems((prevItems: TaskItem[]) => {
      return [...prevItems, newItem];
    });
  }
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
      const filteredData = filterByCategory(fetchedItems);
      setActiveItems(filteredData);
      setIsLoading(false);
    })();
  }, [activeCategoryId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedItems = await getDoneItems();
      const filteredData = filterByCategory(fetchedItems);
      setDoneItems(filteredData);
      setIsLoading(false);
    })();
  }, [activeCategoryId]);

  const [authorsItems, setAuthorItems] = useState<Authors[] | undefined>([]);
  useEffect(() => {
    getAuthorsItems().then((localAuthorsItems) => {
      setAuthorItems(localAuthorsItems);
    });
  }, []);

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
          <span className="number">{categoryLength}</span>
          <span className="name">Categories</span>
        </div>
      </div>

      <AddBox
        activeCategoryId={activeCategoryId}
        addNewItemToState={addNewItemToState}
        authorsItems={authorsItems || []}
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
          <ToDoList items={activeItems} toggleTask={toggleTask} />
        )}

        <ToggleButton
          isDivVisible={isDivVisible}
          setDivVisible={setDivVisible}
        />

        {isDivVisible && (
          <div className="taskDoneItem">
            <ToDoList items={doneItems} toggleTask={toggleTask} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
