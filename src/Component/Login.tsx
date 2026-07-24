import {  useState} from "react";
import "./Login.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "../apis/login";
//import { LoginResponse } from "../types/LoginResponse";
import {  useUserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../Contexts/TokenContext";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useUserContext();
  const tokenContext = useTokenContext();

  if (!userContext || !tokenContext) {
    throw new Error("Login must be inside UserContext.Provider and TokenContext.Provider");
  }

  const { setUser } = userContext;
   const { setToken } = tokenContext;
  const navigate = useNavigate();

  async function onLoginClick() {
    const loginResult = await login(userName, password);

    if (loginResult) {
      navigate("/");
      setUser(loginResult.user);
      setToken(loginResult.token);
      localStorage.setItem(
  "localUser",
      JSON.stringify(loginResult.user)
    );
    localStorage.setItem(
  "localToken",
     JSON.stringify(loginResult.token)
    );
    const localToken = localStorage.getItem("localToken");
    console.log("User and token saved to localStorage:",localToken);
    }
  }
  
  
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login to the App</h1>
      <div className="loginBox">
        <div className="row">
          <label htmlFor="username">Username</label>
          <div className="inputWrapper" >
            <input className="username" value={userName} onChange={(e) => setUserName(e.target.value)}></input>
            <FaUser className="icon" />
          </div>
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <div className="inputWrapper">
            <input className="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <FaLock className="icon" />
          </div>
        </div>
        <div className="errorLogin">
          <span>The username or password is incorrect,Please try again.</span>
        </div>
      </div>
      <div className="loginBtnContainer" style={{}}>
        <button
          className="loginBtn"
          onClick={() => {
            onLoginClick() 
          //   toast.success("Settings saved successfully!");
           }}
        >
          Login
        </button>
        
      </div>
    </div>
  );
}

export default Login;
//function setUser(user: LoginData[]) {
 // throw new Error("Function not implemented.");
//}

