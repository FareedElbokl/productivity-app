import React from "react";
import { Link } from "react-router-dom";
import HomeIconNavbar from "./HomeIconNavbar";
import LogoutButton from "../pages/homepage/LogoutButton";

const Navbar = (props) => {
  console.log(props.isAuthenticated);
  return (
    <header className="header">
      <HomeIconNavbar></HomeIconNavbar>

      <nav className="navbar">
        {!props.isAuthenticated ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <LogoutButton setAuth={props.setAuth}></LogoutButton>
        )}
        <span
          onClick={() => {
            props.setShowSettingsModal(true);
          }}
        >
          Settings
        </span>
        {props.isAuthenticated ? (
          <span
            onClick={() => {
              props.setShowHistoryModal(true);
            }}
          >
            History
          </span>
        ) : null}
      </nav>
    </header>
  );
};

export default Navbar;
