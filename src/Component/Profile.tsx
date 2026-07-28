import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import {
  EXPIRES_IN_SECONDS_KEY,
  TOKEN_KEY,
  USER_KEY,
} from "../Constants/constants";
import { TodoListContext } from "../Contexts/TodoListContext";
import { useContext } from "react";
function Profile() {
  const context = useContext(TodoListContext);
  const user = context?.user;

  function onLogoutClick() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_IN_SECONDS_KEY);
    navigate("/Login");
  }
  const registerDateFormatted = new Date(
    Number(user.registerDate),
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const lastLoginDateFormatted = new Date(
    user.lastLoginDate,
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Profile</h1>
      <div className="profileBox">
        <p>
          {"Username:"} <b>{user?.userName || "Guest"}</b>
        </p>
        <p>
          {"Sign-up date: "}
          <b> {user?.registerDate ? registerDateFormatted : ""}</b>
        </p>
        <p>
          {"Last login date: "}
          <b>
            {user?.lastLoginDate ? lastLoginDateFormatted : "Not yet logged in"}
          </b>
        </p>

        <div className="logoutBtnContainer" style={{}}>
          <button className="LogoutBtn" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
