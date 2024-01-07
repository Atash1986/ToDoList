import "./App.css";
import { GrDocumentText } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainPage from "./MainPage";
import Sidbar from "./Sidbar";
import React, { useEffect, useState } from "react";
import { Category } from "../types/Category";
import { getCategory } from "../apis/category";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setCategories(await getCategory());
    })();
  }, []);

  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className="App ">
        <div className="container">
          <Sidbar
            appTitle="Ati To Do  List"
            logo={<GrDocumentText size="7em" />}
            categories={categories}
            activeCategoryId={activeCategoryId}
            setCategoryId={setCategoryId}
          />

          <MainPage activeCategoryId={activeCategoryId} />
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default App;
