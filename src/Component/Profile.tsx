import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import {
  LOCAL_EXPIRES_IN_SECONDS,
  LOCAL_TOKEN,
  LOCAL_USER,
} from "../Constants/constants";
function Profile() {
  const localUser = localStorage.getItem(LOCAL_USER);
  const user = localUser ? JSON.parse(localUser) : null;
  const expiresInSeconds = localStorage.getItem(LOCAL_EXPIRES_IN_SECONDS)
    ? Number(localStorage.getItem(LOCAL_EXPIRES_IN_SECONDS))
    : null;

  function onLogoutClick() {
    localStorage.removeItem(LOCAL_USER);
    localStorage.removeItem(LOCAL_TOKEN);
    localStorage.removeItem(LOCAL_EXPIRES_IN_SECONDS);
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
          {"expiresInSeconds:"} <b>{expiresInSeconds || ""}</b>
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
