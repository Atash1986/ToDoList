import { useState } from "react";
import "../Login/Login.scss";
import { FaUser, FaLock } from "react-icons/fa";
import { login } from "../../../apis/login";
import { useTodoListContext } from "../../../Contexts/TodoListContext";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY, USER_KEY } from "../../../Constants/constants";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useTodoListContext();
  const tokenContext = useTodoListContext();

  if (!userContext || !tokenContext) {
    throw new Error(
      "Login must be inside UserContext.Provider and TokenContext.Provider",
    );
  }

  const { setUser } = userContext;
  const { setToken } = tokenContext;

  const navigate = useNavigate();

  async function onLoginClick() {
    const loginResult = await login(userName, password);
    console.log("result:", loginResult)
    if (loginResult) {
      navigate("/");
      setUser(loginResult.user);
      setToken(loginResult.token);
      localStorage.setItem(USER_KEY, JSON.stringify(loginResult.user));
      localStorage.setItem(TOKEN_KEY, loginResult.token);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login to the App</h1>
      <div className="loginBox">
        <div className="row">
          <label htmlFor="username">Username</label>
          <div className="inputWrapper">
            <input
              className="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            <FaUser className="icon" />
          </div>
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <div className="inputWrapper">
            <input
              className="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <FaLock className="icon" />
          </div>
        </div>
        <div className="errorLogin">
          <span>The username or password is incorrect,Please try again.</span>
        </div>
      </div>
      <div className="loginBtnContainer" style={{}}>
        <button className="loginBtn" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
