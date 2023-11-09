import React, { MouseEvent } from "react";

import "./CategoryItem.css";
type Props = {
  id: number;
  color: string;
  title: string;
  isActive: boolean;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};
function CategoryItem({ id, color, title, isActive, onClick }: Props) {
  return (
    <li onClick={onClick} key={id} className="categoryItem">
      <div
        className={"inner-div" + (isActive === true ? " active-div" : "")}
        id={String(id)}
        onClick={onClick}
      >
        <div
          className="bubble"
          style={{
            backgroundColor: color,
          }}
        />

        <div className="categoryItemTitle">{title}</div>
      </div>
    </li>
  );
}

export default CategoryItem;
