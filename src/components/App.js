import { Route, Routes, useNavigate } from "react-router";
import { useReducer, useEffect, useLayoutEffect } from "react";
import HomePage from "./HomePage/HomePage";
import Header from "./Header/Header";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import AddItemPage from "./AddItemPage/AddItemPage";
import ItemDetails from "./ItemDetails/ItemDetails";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import reducer from "./Reducer";
import "./App.scss";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const initialState = {
    email: "",
    password: "",
    isLoggedIn: false,
    name: "",
    error: "",
    IsLoading: false,
    items: [],
    added: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const loginInput = (e, field) => {
    dispatch({ type: "FIELD", field, data: e.target.value });
  };
  // Logging in a User
  const loginUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING" });
    try {
      const result = await axios.post("http://localhost:4000/login", {
        email: state.email,
        password: state.password,
      });
      if (result) {
        dispatch({ type: "LOGIN_SUCCESS", data: result.data });
        dispatch({ type: "LOADING_FINISH" });
        dispatch({ type: "CLEAR" });
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOADING_FINISH" });
      dispatch({ type: "ERROR", data: err.response.data });
    }
  };
  // Logging out a User
  const logout = async () => {
    const result = await axios.get("http://localhost:4000/logout");
    if (result) {
      console.log(result);
      dispatch({ type: "LOGOUT" });
      getLogin();
      navigate("/");
    }
  };
  // When user click on an item on home page it navigates user to details page of that item
  const itemDetails = (id) => {
    navigate(`/itemdetails/${id}`);
  };
  // When user click on edit button it's redirect user to edit page. we are reusing the additem component to edit the item also.
  const editItem = (id) => {
    navigate(`/edit/${id}`);
  };
  // To maintain user's Login state used with useEffect hook below
  const getLogin = async () => {
    try {
      const user = await axios.get("http://localhost:4000");
      if (user) {
        dispatch({ type: "LOGIN_SUCCESS", data: user.data });
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  // To Delete an item
  const deleteItem = async (id) => {
    const result = await axios.put("http://localhost:4000/user/deleteitem", {
      id,
    });
    if (result) {
      getLogin();
      navigate("/");
    }
  };

  // calling getLogin function inside useEffect hook to maintain login state of user
  useEffect(() => {
    getLogin();
  }, []);

  return (
    <>
      <Header logout={logout} state={state} />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={<HomePage itemDetails={itemDetails} state={state} />}
          />
          <Route
            path="/login"
            element={
              !state.isLoggedIn ? (
                <LoginPage
                  loginUser={loginUser}
                  loginInput={loginInput}
                  state={state}
                />
              ) : (
                <NotFoundPage />
              )
            }
          />
          <Route
            path="/register"
            element={!state.isLoggedIn ? <RegisterPage /> : <NotFoundPage />}
          />
          <Route
            path="/edit/:id"
            element={
              state.items.length > 0 ? (
                <AddItemPage getLogin={getLogin} state={state} />
              ) : null
            }
          />
          <Route
            path="/additem"
            element={
              state.isLoggedIn ? (
                <AddItemPage getLogin={getLogin} state={state} />
              ) : (
                <NotFoundPage />
              )
            }
          />
          <Route
            path="/itemdetails/:id"
            element={
              state.isLoggedIn && state.items.length > 0 ? (
                <ItemDetails
                  editItem={editItem}
                  deleteItem={deleteItem}
                  state={state}
                />
              ) : (
                <NotFoundPage />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
