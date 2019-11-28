const authReducer = (state = { currentUser: null , requesting: false }, action) => {
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

    default:
      return {...state,
      requesting: false
    }
  }
};

export default authReducer;
