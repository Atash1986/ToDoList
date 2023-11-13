import React, { MouseEvent } from "react";
import logoDefaultImg from "../LDI.png";
import profileLogo from "../profile.png";
import settingLogo from "../OIP.jpg";
import CategoryItem from "./CategoryItem";
import "./Sidbar.css";
import ToDoList from "./ToDoList";
import { category } from "../types/category";
import { setterFn } from "../types/general";

type Props = {
  appTitle: string;
  logo: string;
  categories: Array<category>;
  activeCategoryId: number;
  setCategoryId: setterFn;
};

function Sidbar({
  appTitle = "Ati project",
  logo = logoDefaultImg,
  categories,
  activeCategoryId,
  setCategoryId,
}: Props) {
  function handelClick(event: MouseEvent<HTMLElement>, selectedId: number) {
    // const selectedId=Number(event.target.id);
    setCategoryId(selectedId);

    <ToDoList activeCategoryId={activeCategoryId} />;
  }

  return (
    <div className="sidbar">
      <header>
        <h1 className="title">{appTitle}</h1>
        <img className="logo" src={logo} />
      </header>
      <div className="menu">
        <h1>To Do </h1>

        <ul>
          <CategoryItem
            id={0}
            color="rgba(0,0,0,0)"
            title="All Tasks"
            isActive={activeCategoryId === 0 ? true : false}
            onClick={(event: MouseEvent<HTMLElement>) => handelClick(event, 0)}
          />
          {categories.map((categoryItem: category) => {
            return (
              <CategoryItem
                key={categoryItem.id}
                id={categoryItem.id}
                color={categoryItem.color}
                title={categoryItem.title}
                isActive={categoryItem.id === activeCategoryId ? true : false}
                onClick={(event: MouseEvent<HTMLElement>) =>
                  handelClick(event, categoryItem.id)
                }
              />
            );
          })}
        </ul>
      </div>
      <footer>
        <img className="profileLogo" src={profileLogo} />
        <img className="settingLogo" src={settingLogo} />
      </footer>
    </div>
  );
}

export default Sidbar;
