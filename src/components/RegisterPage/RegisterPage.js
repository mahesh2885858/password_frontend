import React from "react";
import { Link } from "react-router-dom";
import { useReducer } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./RegisterPage.scss";
import reducer from "./Reducer";

const RegisterPage = () => {
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    error: "",
    isInProgress: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleInput = (e, field) => {
    dispatch({ type: "FIELD", field, data: e.target.value });
  };
  // To Register a new User
  const register = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTRATION_IN_PROGRESS" });
    try {
      const result = await axios.post("http://localhost:4000/register", state);
      if (result) {
        dispatch({ type: "CLEAR" });
        dispatch({ type: "REGISTRATION_IN_PROGRESS" });
        navigate("/login"); //User will be navigated to login page if the registration is successful
      }
    } catch (err) {
      dispatch({ type: "ERROR", data: err.response.data });
    }
  };

  return (
    <div className="registration-container">
      <h1>Register</h1>
      <form
        className="registration-form-container"
        action="#"
        onSubmit={register}
      >
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={state.name}
            onChange={(e) => handleInput(e, "name")}
            required
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            value={state.email}
            type="email"
            onChange={(e) => handleInput(e, "email")}
            required
          />
        </label>
        <label htmlFor="password">
          Master Password:
          <input
            value={state.password}
            type="password"
            onChange={(e) => handleInput(e, "password")}
            required
          />
        </label>

        <label htmlFor="password">
          confirm Password:
          <input
            type="password"
            value={state.cpassword}
            onChange={(e) => handleInput(e, "cpassword")}
            required
          />
        </label>
        <button>Register</button>
      </form>
      <p>
        Already have an account Login<Link to="/login"> Here</Link>
      </p>
      {state.error ? <p className="status">{state.error}</p> : undefined}
      {!state.error && state.isInProgress ? (
        <p className="status">creating user please wait...</p>
      ) : undefined}
    </div>
  );
};

export default RegisterPage;
