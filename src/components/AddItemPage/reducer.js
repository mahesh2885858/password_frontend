const Reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return { ...state, [action.field]: action.data };
    case "IS_ADDING":
      return { ...state, isAdding: !state.isAdding };
    case "CLEAR":
      return {
        ...state,
        websitename: "",
        username: "",
        email: "",
        password: "",
      };

    default:
      return state;
  }
};
export default Reducer;
