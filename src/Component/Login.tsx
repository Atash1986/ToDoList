import "./Login.scss";
import { FaUser, FaLock } from "react-icons/fa";
function Login() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Login to the App</h1>
      <div className="loginBox">
        <div className="row">
          <label htmlFor="username">Username</label>
          <div className="inputWrapper">
            <input className="username"></input>
            <FaUser className="icon" />
          </div>
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <div className="inputWrapper">
            <input className="password" type="password"></input>
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
          // onClick={() => {
          //   setLanguage(selectedLanguage);
          //   toast.success("Settings saved successfully!");
          // }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
