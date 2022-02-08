const reducer = (state, action) => {
  switch (action.type) {
    case "FIELD":
      return { ...state, [action.field]: action.data, error: "" };

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoggedIn: true,
        items: [...action.data.items],
        error: "",
        name: action.data.name,
      };
    }

    case "ERROR": {
      return { ...state, error: action.data };
    }
    case "LOGOUT": {
      return { ...state, isLoggedIn: false, name: "", items: [] };
    }
    case "LOADING": {
      return { ...state, IsLoading: true };
    }
    case "LOADING_FINISH": {
      return { ...state, IsLoading: false };
    }
    case "RELOAD": {
      return { ...state, added: true };
    }
    case "CLEAR": {
      return { ...state, email: "", password: "" };
    }
    default:
      return state;
  }
};
export default reducer;
