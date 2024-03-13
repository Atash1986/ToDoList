import "./App.css";
import { GrDocumentText } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainPage from "./MainPage";
import Sidbar from "./Sidbar";
import { useEffect, useState } from "react";
import { Category } from "../types/Category";
import { getCategories } from "../apis/category";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);

  return (
    <IconContext.Provider value={{ color: "white" }}>
      <div className="App ">
        <div data-testid="app-container" className="container">
          <Sidbar
            data-testid="Sidbar"
            appTitle="Ati To Do  List"
            logo={<GrDocumentText size="7em" />}
            categories={categories}
            activeCategoryId={activeCategoryId}
            setCategoryId={setCategoryId}
          />

          <MainPage
            data-testid="MainPage"
            categoryLength={categories.length}
            activeCategoryId={activeCategoryId}
          />
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default App;
