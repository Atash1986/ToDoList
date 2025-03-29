import { TaskItem } from "../types/TaskItem";
import ToDoItem from "./ToDoItem";
import { toggleTaskApi } from "../apis/task";

function ToDoList({
  items,
  // setItems,
  toggleTask,
}: {
  // eslint-disable-next-line no-unused-vars
  toggleTask: (item: TaskItem) => TaskItem[] | void;
  items: TaskItem[];
  // setItems: React.Dispatch<React.SetStateAction<TaskItem[]>>;
}): React.JSX.Element {
  async function handleCheck(selectId: string) {
    const item: TaskItem = await toggleTaskApi(selectId);
    const selectedItem: TaskItem | undefined = items.find(
      (item: TaskItem) => item.id == selectId
    );
    const colorSelectedItem = selectedItem!.categoryItem.color;
    const idSelectedItem = selectedItem!.categoryItem.id;
    item.categoryItem = { id: idSelectedItem, color: colorSelectedItem };
    toggleTask(item);
  }

  return (
    <ul className="taskBox">
      {items.map((item: TaskItem) => {
        return <ToDoItem item={item} key={item.id} onChecked={handleCheck} />;
      })}
    </ul>
  );
}

export default ToDoList;
