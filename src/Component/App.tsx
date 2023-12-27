import "./App.css";
import { GrDocumentText } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainPage from "./MainPage";
import Sidbar from "./Sidbar";
import logoDynamic from "../assest/image/logo.jpeg";
import Categories from "../data/categories";
import React, { useState } from "react";

function App() {
  const [activeCategoryId, setCategoryId] = useState<number>(0);
  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className="App ">
        <div className="container">
          <Sidbar
            appTitle="Ati To Do  List"
            logo={<GrDocumentText size="7em" />}
            categories={Categories}
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
