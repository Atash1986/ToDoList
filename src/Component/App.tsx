import "./App.css";
import { GrDocumentText } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainPage from "./MainPage";
import Sidbar from "./Sidbar";
import { useEffect, useState } from "react";
import { Category } from "../types/Category";
import { getCategories } from "../apis/category";
import { Routes, Route, Navigate } from "react-router-dom";
import Setting from "./Setting";
import Login from "./Login";
import { TodoListContext } from "../Contexts/TodoListContext";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../types/User";
import { UserContext } from "../Contexts/UserContext";
import Profile from "./Profile";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setCategoryId] = useState<number>(0);
  const [language, setLanguage] = useState("en");
  const [user,setUser]=useState<User|null>(null);
  
const isLogin = localStorage.getItem("localUser");

  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  return (
    <TodoListContext.Provider value={{ language, setLanguage }}>
      <UserContext.Provider value={{user,setUser}}>
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
            <Routes>
              <Route
                path="/"
                element={
                     isLogin ?(
                      <MainPage
                      categoryLength={categories.length}
                      activeCategoryId={activeCategoryId}
                    />
                  
                ):(
                 <Navigate to="/login" replace />
                )
              }
              />
              <Route path="/setting" element={<Setting />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          transition={Slide}
        />
      </IconContext.Provider>
      </UserContext.Provider>
    </TodoListContext.Provider>
  );
}
export default App;
