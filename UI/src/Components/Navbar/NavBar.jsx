import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="navbarCPntainer">
      <div className="logohilder">
        <div className="logo">
          <h2>ChatBoks</h2>
        </div>
      </div>
      <div className="navholders">
        <NavLink to={"/signup"}>
          <div className="navboxs">
         <p>register</p>
          </div>
        </NavLink>
        <NavLink to={"/login"}>
          <div className="navboxs">
         <p>login</p>
          </div>
        </NavLink>
        <NavLink to="/logout"><p>Logout</p></NavLink>
      </div>
    </div>
  );
};

export default NavBar;
