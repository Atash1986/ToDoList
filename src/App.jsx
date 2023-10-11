import "./styles.css";
import ToDoList from "./Component/ToDoList";
import Sidbar from "./Component/Sidbar";
import logoDynamic from "./logo.jpeg";
import Categories from "./Component/Categories";
function App() {
  return (
    <div className="App ">
      <div className="container">
        <Sidbar
          appTitleDynamic="Ati To Do  List"
          logoDynamic={logoDynamic}
          categories={Categories}
        />
        <div className="panel">
          <ToDoList />
        </div>
      </div>
    </div>
  );
}
export default App;
