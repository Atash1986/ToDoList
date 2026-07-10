import { MouseEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  function handelClick(event: MouseEvent<HTMLElement>, selectedId: number) {
    setCategoryId(selectedId);
    if (location.pathname !== "/") {
      navigate("/");
    }
    <ToDoList activeCategoryId={activeCategoryId} categoryLength={0} />; //why need categoryLength
  }

  const settingNavigate = () => {
    navigate("/Setting");
  };
  const loginNavigate = () => {
    navigate("/Login");
  };
  return (
    <div className="sidebar-container">
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
          <CgProfile className="SidbarIcon" onClick={loginNavigate} />
          <IoSettingsOutline className="SidbarIcon" onClick={settingNavigate} />
        </footer>
      </div>
    </div>
  );
}

export default Sidbar;
