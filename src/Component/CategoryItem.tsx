import React, { MouseEvent } from "react";
import "./CategoryItem.css";
import { Category } from "../types/Category";

type Props = {
  categoryItem: Category;
  isActive: boolean;
  // onClick: (event: any) => void;
  onClick: any;
  //
};
function CategoryItem({ categoryItem, isActive, onClick }: Props) {
  return (
    <li onClick={onClick} key={categoryItem.id} className="categoryItem">
      <div
        className={"inner-div" + (isActive === true ? " active-div" : "")}
        id={String(categoryItem.id)}
        onClick={onClick}
      >
        <div
          className="bubble"
          style={{
            backgroundColor: categoryItem.color,
          }}
        />

        <div className="categoryItemTitle">{categoryItem.title}</div>
      </div>
    </li>
  );
}

export default CategoryItem;
