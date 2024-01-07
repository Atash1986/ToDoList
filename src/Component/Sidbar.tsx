import React, { MouseEvent } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import logoDefaultImg from "../assest/image/LDI.png";
import CategoryItem from "./CategoryItem";
import "./Sidbar.css";
import ToDoList from "./MainPage";
import { Category } from "../types/Category";
import { SetterFn } from "../types/General";

type Props = {
  appTitle: string;
  logo: any;
  categories: Array<Category>;
  activeCategoryId: number;
  setCategoryId: SetterFn;
};

function Sidbar({
  appTitle = "Ati project",
  logo = logoDefaultImg,
  categories,
  activeCategoryId,
  setCategoryId,
}: Props) {
  function handelClick(event: MouseEvent<HTMLElement>, selectedId: number) {
    setCategoryId(selectedId);
    <ToDoList activeCategoryId={activeCategoryId} />;
  }

  return (
    <div className="all">
      <div className="sidbar">
        <header>
          <h1 className="title">{appTitle}</h1>
          <div className="logo">{logo}</div>
        </header>
        <div className="menu">
          <h1>To Do </h1>

          <ul>
            <CategoryItem
              categoryItem={{
                id: 0,
                color: "rgba(0,0,0,0)",
                title: "All Task",
              }}
              isActive={activeCategoryId === 0 ? true : false}
              onClick={(event: MouseEvent<HTMLElement>) =>
                handelClick(event, 0)
              }
            />

            {categories.map((categoryItem: Category) => {
              return (
                <CategoryItem
                  key={categoryItem.id}
                  categoryItem={categoryItem}
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
          <CgProfile className="profileLogo" />
          <IoSettingsOutline className="settingLogo" />
        </footer>
      </div>
    </div>
  );
}

export default Sidbar;
