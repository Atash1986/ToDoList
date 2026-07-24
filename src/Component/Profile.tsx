import { useNavigate } from "react-router-dom";
import "./Profile.scss";
function Profile() {
  const localUser = localStorage.getItem("localUser");
const user=localUser ? JSON.parse(localUser) : null;
 function onLogoutClick()
 {
   localStorage.removeItem("localUser");
   navigate("/Login");
 }
 const navigate = useNavigate();
  return (
    <div style={{ padding: "20px" }}>
       <h1>User Profile</h1>
    <div className="profileBox" >
      <p>{"Username:"} <b>{user?.userName || "Guest"}</b></p>
      <p>{"Sign-up date: "}<b> {user?.registerDate ? new Date(Number(user.registerDate)).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) : ""}</b></p>
      <p>{"Last login date: "}<b>{user?.lastLoginDate ? new Date(user.lastLoginDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) : "Not yet logged in"}</b></p>
      
      <div className="logoutBtnContainer" style={{}}>
        <button
          className="LogoutBtn"
          onClick={() => {
            onLogoutClick() 
          //   toast.success("Settings saved successfully!");
           }}
        >
          Logout
        </button>
        </div>
        </div>
        </div>
  );
}

export default Profile;
