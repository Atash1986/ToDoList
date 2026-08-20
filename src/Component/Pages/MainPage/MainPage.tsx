import { useState, useEffect, useRef, useMemo } from "react";
import "./MainPage.css";
import { TaskItem } from "../../../types/TaskItem";
import "react-tooltip/dist/react-tooltip.css";
import AddBox from "../../Molecules/AddBox/AddBox";
import ToDoList from "../../Organisms/ToDoList/ToDoList";
import { ToggleButton } from "../../Atoms/ToggleButton/ToggleButton";
import NoDataImage from "../../../assest/image/no-data.png";
import LoadingSpinnerComponent from "react-spinners-components";
import { getActiveItems, getDoneItems } from "../../../apis/task";
import { getAuthorsItems } from "../../../apis/author";
import { Authors } from "../../../types/Authors";

function MainPage({
  activeCategoryId,
  categoryLength,
}: {
  activeCategoryId: number;
  categoryLength: number;
}) {
  const [isDivVisible, setDivVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allActiveItems, setAllActiveItems] = useState<TaskItem[]>([]);
  const [allDoneItems, setAllDoneItems] = useState<TaskItem[]>([]);
  const isAllCategory = activeCategoryId === 0;
  const bottomRef = useRef<HTMLDivElement | null>(null);


  function addNewItemToState(newItem: TaskItem) {
    setAllActiveItems((prevItems: TaskItem[]) => {
      return [...prevItems, newItem];
    });
  }
  function toggleTask(item: TaskItem): TaskItem[] | void {
    if (item.isDone === true) {
      setAllActiveItems((activeItems) => {
        return activeItems.filter(
          (activeItem: TaskItem) => activeItem.id !== item.id,
        );
      });
      return setAllDoneItems([...allDoneItems, item]);
    } else {
      setAllDoneItems((doneItems) => {
        return doneItems.filter(
          (doneItem: TaskItem) => doneItem.id !== item.id,
        );
      });
      return setAllActiveItems([...allActiveItems, item]);
    }
  }

  const filterByCategory = (items: TaskItem[]) => {
    return items.filter(
      (item: TaskItem) =>
        item.categoryItem.id === activeCategoryId || isAllCategory,
    );
  };

  const filteredActiveItems = useMemo(() => {
    return filterByCategory(allActiveItems);

  }, [activeCategoryId, allActiveItems]);

  useEffect(() => {
    (async () => {

      setIsLoading(true);
      const fetchedItems = await getActiveItems();
      setAllActiveItems(fetchedItems);
      setIsLoading(false);
    })();
  }, []);

  const filteredDoneItems = useMemo(() => {
    return filterByCategory(allDoneItems);
  }, [activeCategoryId, allDoneItems]);

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
          <span className="number">{filteredActiveItems.length}</span>
          <span className="name">Active Tasks</span>
        </div>
        <div className="statisticsDetail">
          <span className="number">{filteredDoneItems.length}</span>
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

        {isLoading === false && filteredActiveItems.length === 0 && (
          <img className="noDataImage" src={NoDataImage} />
        )}

        {isLoading === false && filteredActiveItems.length > 0 && (
          <ToDoList items={filteredActiveItems} toggleTask={toggleTask} />
        )}

        <ToggleButton
          isDivVisible={isDivVisible}
          setDivVisible={setDivVisible}
          afterToggle={bottomRef}
        />

        {isDivVisible && (
          <div className="taskDoneItem" ref={bottomRef}>
            <ToDoList items={filteredDoneItems} toggleTask={toggleTask} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
