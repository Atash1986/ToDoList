import "./App.css";
import ToDoList from "./ToDoList";
import Sidbar from "./Sidbar";
import logoDynamic from "../logo.jpeg";
import Categories from "./Categories";
import { useState } from "react";
function App() {
  const [activeCategoryId, setCategoryId] = useState<number>(0);
  return (
    <div className="App ">
      <div className="container">
        <Sidbar
          appTitle="Ati To Do  List"
          logo={logoDynamic}
          categories={Categories}
          activeCategoryId={activeCategoryId}
          setCategoryId={setCategoryId}
        />

        <ToDoList activeCategoryId={activeCategoryId} />
      </div>
    </div>
  );
}
export default App;