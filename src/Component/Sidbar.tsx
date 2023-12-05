import React, { MouseEvent } from "react";
import { GrDocumentText } from "react-icons/gr";

import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import logoDefaultImg from "../assest/image/LDI.png";
import profileLogo from "../assest/image/profile.png";
import settingLogo from "../assest/image/OIP.jpg";
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
    // const selectedId=Number(event.target.id);
    setCategoryId(selectedId);

    <ToDoList activeCategoryId={activeCategoryId} />;
  }

  return (
    <div className="sidbar">
      <header>
        <h1 className="title">{appTitle}</h1>
        <div className="logo">{logo}</div>
        {/* <img className="logo" src={logo} /> */}
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
          {categories.map((categoryItem: Category) => {
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
        {/* <IoDocumentTextOutline /> */}
        <CgProfile className="profileLogo" />
        {/* <img className="profileLogo" src={profileLogo} /> */}
        {/* <img className="settingLogo" src={settingLogo} /> */}
        <IoSettingsOutline className="settingLogo" />
      </footer>
    </div>
  );
}

export default Sidbar;
