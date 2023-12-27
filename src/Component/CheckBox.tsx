import React, { useState } from "react";
import { TaskItem } from "../types/TaskItem";
import "./CheckBox.scss";
type Props = {
  onChecked: (id: number) => void;
  item: TaskItem;
};
function Checkbox({ onChecked, item }: Props) {
  const defaultChecked = item.isDone ? true : false;
  const [isChecked, setIsChecked] = useState(defaultChecked);

  return (
    <div className="checkbox-col">
      <input
        className="checkbox"
        type="checkbox"
        checked={item.isDone}
        onClick={() => onChecked(item.id)}
      />
    </div>
  );
}
export default Checkbox;
