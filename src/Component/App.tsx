import "./App.css";
import { GrDocumentText } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainPage from "./MainPage";
import Sidbar from "./Sidbar";
import logoDynamic from "../assest/image/logo.jpeg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "../types/Category";
import { baseUrl } from "../apis/core";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const getCategory = async () => {
    try {
      const result = await axios.get(baseUrl + "categories");
      // setCategories(result.data.data);
      return result.data.data;
    } catch (error) {
      const typedError = error as Error;
      console.error("Error:", typedError.message);
      return [];
    }
  };
  useEffect(() => {
    (async () => {
      setCategories(await getCategory());
    })();
  }, []);
  const [activeCategoryId, setCategoryId] = useState<number>(0);
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
