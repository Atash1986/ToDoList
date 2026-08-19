import "./App.css";
import { GrDocumentText } from "react-icons/gr";
import { IconContext } from "react-icons";
import MainPage from "../Pages/MainPage/MainPage";
import Sidbar from "../Sidbar/Sidbar";
import { useEffect, useState, useReducer } from "react";
import { Category } from "../../types/Category";
import { getCategories } from "../../apis/category";
import { Routes, Route, Navigate } from "react-router-dom";
import Setting from "../Setting/Setting";
import Login from "../Pages/Login/Login";
import { TodoListContext } from "../../Contexts/TodoListContext";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../types/User";
import Profile from "../Profile/Profile";
import { USER_KEY } from "../../Constants/constants";
import { LanguageAction, LanguageState, } from "../../Contexts/TodoListContext";

function App() {
  function languageReducer(
    state: LanguageState,
    action: LanguageAction
  ): LanguageState {
    switch (action.type) {
      case "SET_LANGUAGE":
        return {
          ...state,
          language: action.payload,
        };

      default:
        return state;
    }
  }
  const initialLanguageState: LanguageState = { language: "en" };
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setCategoryId] = useState<number>(0);
  const [languageState, dispatch] = useReducer(languageReducer, initialLanguageState);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isLogin = localStorage.getItem(USER_KEY) !== null;



  useEffect(() => {
    (async () => {
      setCategories(await getCategories());
    })();
  }, []);
  useEffect(() => {
    const userString = localStorage.getItem(USER_KEY);
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  return (
    <TodoListContext.Provider
      value={{ languageState, dispatch, user, setUser, token, setToken }}
    >
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
                  isLogin ? (
                    <MainPage
                      categoryLength={categories.length}
                      activeCategoryId={activeCategoryId}
                    />
                  ) : (
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
    </TodoListContext.Provider>
  );
}
export default App;
