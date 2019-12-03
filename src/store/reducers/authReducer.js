const authReducer = (state = { currentUser: null , requesting: true }, action) => {
  switch (action.type) {
    case "FETCH_AUTH":
      return {
        ...state,
        currentUser: null,
        requesting: true
      }

    case "SET_AUTH":
      return {
        ...state,
        currentUser: action.currentUser,
        requesting: false
      };

    case "CLEAR_AUTH":
      return {
        ...state,
        currentUser: null
      }

    default:
      return {...state
    }
  }
};

export default authReducer;
