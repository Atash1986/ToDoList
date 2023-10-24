import "./App.css";
import ToDoList from "./ToDoList";
import Sidbar from "./Sidbar";
import logoDynamic from "../logo.jpeg";
import Categories from "./Categories";
function App() {
  return (
    <div className="App ">

      <div className="container">

        <Sidbar
          appTitleDynamic="Ati To Do  List"
          logo={logoDynamic}
          categories={Categories}
        />

          <ToDoList />
          
      </div>

    </div>
  );
}
export default App;
