import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { AuthUser } from "../../AuthContext/AuthProvider";


const NavBar = () => {
  const {isLogedIn} = AuthUser()
  return (
    <div className="navbarCPntainer">
      <div className="logohilder">
        <div className="logo">
          <NavLink to={"/"}><h2>ChatBoks</h2></NavLink>
        </div>
      </div>
      <div className="navholders">
        {isLogedIn ?( <NavLink to="/logout"><p>Logout</p></NavLink> ) :(
        <div>
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
        </div>) }
      </div>
    </div>
  );
};

export default NavBar;
