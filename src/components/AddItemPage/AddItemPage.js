import React, { useReducer } from "react";
import Reducer from "./reducer";
import axios from "axios";
import "./AddItemPage.scss";
import { useNavigate, useParams } from "react-router";

const AddItemPage = (props) => {
  const params = useParams();
  //since we are reusing the componet to add and also to edit the entry, checking whethere the user want to add a new entry or edit an existing entry
  const item = params.id
    ? props.state.items.filter((item) => item._id === params.id)
    : [];
  const initialState = {
    websitename: item.length > 0 ? item[0].websitename : "",
    username: item.length > 0 ? item[0].username : "",
    email: item.length > 0 ? item[0].email : "",
    password: item.length > 0 ? item[0].password : "",
    isAdding: false,
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const navigate = useNavigate();
  const onchange = (e, type) => {
    dispatch({ type: "CHANGE_INPUT", data: e.target.value, field: type });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "IS_ADDING" });
      // To add a new entry
      if (!params.id) {
        const result = await axios.post(
          "http://localhost:4000/user/additem",
          state
        );
        if (result) {
          console.log(result);
          dispatch({ type: "IS_ADDING" });
          dispatch({ type: "CLEAR" });
          props.getLogin();
          navigate("/");
        }
      } else if (params.id) {
        //To Edit the existing entry
        const result = await axios.put(
          "http://localhost:4000/user/updateitem",
          {
            state,
            id: params.id,
          }
        );
        if (result) {
          props.getLogin();
          dispatch({ type: "CLEAR" });
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err.err);
    }
  };
  return (
    <div className="additem-container">
      <h1>Add Entry</h1>
      <form className="additem-form-container" onSubmit={submit}>
        <label htmlFor="websitename">
          Website Name:
          <input
            type="text"
            required
            value={state.websitename}
            onChange={(e) => {
              onchange(e, "websitename");
            }}
            placeholder="website "
          />
        </label>
        <label htmlFor="username">
          Username:
          <input
            value={state.username}
            type="text"
            onChange={(e) => {
              onchange(e, "username");
            }}
            required
            placeholder="Your Username"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            value={state.email}
            type="email"
            required
            onChange={(e) => {
              onchange(e, "email");
            }}
            placeholder="Email "
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            value={state.password}
            type="password"
            required
            onChange={(e) => {
              onchange(e, "password");
            }}
            placeholder="Password "
          />
        </label>
        <button>Add</button>
      </form>
      <p>{state.isAdding ? "Adding Entry..." : undefined}</p>
    </div>
  );
};

export default AddItemPage;
