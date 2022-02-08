import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  return (
    <nav>
      <h1>
        <Link to="/">
          {props.state.name ? props.state.name + "'s " : ""}Vault
        </Link>
      </h1>
      <div>
        {props.state.isLoggedIn ? (
          <Link to="/additem">Add Item</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {props.state.isLoggedIn ? (
          <Link to="#" onClick={props.logout}>
            Logout
          </Link>
        ) : (
          <Link to="/register">Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
