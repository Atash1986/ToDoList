import { useState, useEffect, useRef, useMemo } from "react";
import "./MainPage.css";
import { TaskItem } from "../../types/TaskItem";
import "react-tooltip/dist/react-tooltip.css";
import AddBox from "../Molecules/AddBox/AddBox";
import ToDoList from "../ToDoList/ToDoList";
import { ToggleButton } from "../ToggleButton/ToggleButton";
import NoDataImage from "../../assest/image/no-data.png";
import LoadingSpinnerComponent from "react-spinners-components";
import { getActiveItems, getDoneItems } from "../../apis/task";
import { getAuthorsItems } from "../../apis/author";
import { Authors } from "../../types/Authors";

function MainPage({
  activeCategoryId,
  categoryLength,
}: {
  activeCategoryId: number;
  categoryLength: number;
}) {
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allActiveItems, setAllactiveItems] = useState<TaskItem[]>([]);
  const [AllDoneItems, setAllDoneItems] = useState<TaskItem[]>([]);
  const isAllCategory = activeCategoryId === 0;
  const bottomRef = useRef<HTMLDivElement | null>(null);


  function addNewItemToState(newItem: TaskItem) {
    setAllactiveItems((prevItems: TaskItem[]) => {
      return [...prevItems, newItem];
    });
  }
  function toggleTask(item: TaskItem): TaskItem[] | void {
    if (item.isDone === true) {
      setAllactiveItems((activeItems) => {
        return activeItems.filter(
          (activeItem: TaskItem) => activeItem.id !== item.id,
        );
      });
      return setAllDoneItems([...AllDoneItems, item]);
    } else {
      setAllDoneItems((doneItems) => {
        return doneItems.filter(
          (doneItem: TaskItem) => doneItem.id !== item.id,
        );
      });
      return setAllactiveItems([...allActiveItems, item]);
    }
  }

  const filterByCategory = (items: TaskItem[]) => {
    return items.filter(
      (item: TaskItem) =>
        item.categoryItem.id === activeCategoryId || isAllCategory,
    );
  };

  const filterActiveData = useMemo(() => {
    return filterByCategory(allActiveItems);

  }, [activeCategoryId, allActiveItems]);

  useEffect(() => {
    (async () => {

      setIsLoading(true);
      const fetchedItems = await getActiveItems();
      setAllactiveItems(fetchedItems);
      setIsLoading(false);
    })();
  }, []);

  const filterDoneData = useMemo(() => {
    return filterByCategory(AllDoneItems);
  }, [activeCategoryId, AllDoneItems]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedItems = await getDoneItems();
      setAllDoneItems(fetchedItems);
      setIsLoading(false);
    })();
  }, []);

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
          <span className="number">{filterActiveData.length}</span>
          <span className="name">Active Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{filterDoneData.length}</span>
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

        {isLoading === false && filterActiveData.length === 0 && (
          <img className="noDataImage" src={NoDataImage} />
        )}

        {isLoading === false && filterActiveData.length > 0 && (
          <ToDoList items={filterActiveData} toggleTask={toggleTask} />
        )}

        <ToggleButton
          isDivVisible={isDivVisible}
          setDivVisible={setDivVisible}
          afterToggle={bottomRef}
        />

        {isDivVisible && (
          <div className="taskDoneItem" ref={bottomRef}>
            <ToDoList items={filterDoneData} toggleTask={toggleTask} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
