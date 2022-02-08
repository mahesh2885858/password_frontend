import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";
import axios from "axios";
axios.defaults.withCredentials = true;

const LoginPage = (props) => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Login</h1>
        <form onSubmit={props.loginUser}>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              onChange={(e) => {
                props.loginInput(e, "email");
              }}
              value={props.state.email}
              required
            />
          </label>
          <label htmlFor="password">
            Master Password:
            <input
              type="password"
              onChange={(e) => {
                props.loginInput(e, "password");
              }}
              value={props.state.password}
              required
            />
          </label>
          <button>Login</button>
        </form>
      </div>
      <p>
        Don't have an account Create One <Link to="/register"> Here</Link>
      </p>
      {props.state.error ? (
        <p className="error">{props.state.error}</p>
      ) : undefined}
      {props.state.IsLoading ? (
        <p className="error"> "Logging In...." </p>
      ) : undefined}
    </div>
  );
};

export default LoginPage;
