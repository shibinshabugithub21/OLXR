import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, firebaseContext } from "../../Store/FirebaseContext"; // Import AuthContext and firebaseContext
// import { firebaseContext } from "../../Store/FirebaseContext";

function Header() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(firebaseContext);

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/login"); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const handleLogin = () => {
    history.push("/login"); // Navigate to login page
  };
  const handleSellClick = () => {
    history.push("/create"); // Navigate to create page
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={handleLogin} style={{ cursor: "pointer" }}>
            {user ? `Hi ${user.displayName}` : "login"}
          </span>
          <hr />
        </div>
        {user && ( // Display logout button only if user is logged in
          <span
            onClick={handleLogout}
            style={{ cursor: "pointer", color: "blue" }} // Optional: Style for better UX
          >
            Logout
          </span>
        )}

<div className="sellMenu">
          <SellButton onClick={handleSellClick}></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={handleSellClick}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
