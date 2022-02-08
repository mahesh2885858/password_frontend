const Reducer = (state, action) => {
  switch (action.type) {
    case "FIELD":
      return {
        ...state,
        [action.field]: action.data,
        error: "",
        isInProgress: false,
      };
    case "CLEAR":
      return { ...state, name: "", email: "", password: "", cpassword: "" };

    case "REGISTRATION_IN_PROGRESS":
      return { ...state, isInProgress: !state.isInProgress };

    case "ERROR":
      return {
        ...state,
        error: action.data,
      };
    default:
      return state;
  }
};
export default Reducer;
