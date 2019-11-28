const LOGIN_API = 'http://localhost:3000/login'
const AUTH_API = 'http://localhost:3000/auth'
const AUTH_TOKEN_NAME = "project-sploopy authorization"


export const SET_AUTH = "SET_AUTH";
export const FETCH_AUTH = "FETCH_AUTH";

export const setCurrentUser = currentUser => ({ type: SET_AUTH, currentUser });

export const login = (email, password) => {
  return async dispatch => {
    try {
      const reqObj = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            user: { 
                email,
                password
            }
        }) }
      

      dispatch({type: FETCH_AUTH})
      const response = await fetch(LOGIN_API, reqObj);
      const authorization = response.headers.get('Authorization')
      localStorage.setItem(AUTH_TOKEN_NAME, authorization)
      const user = await response.json();
    
      dispatch(setCurrentUser(user));

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};

export const fetchCurrentUser = () => {
  return async dispatch => {
    try {
      const reqObj = {
        method: 'GET',
        headers: { 'Content-Type' : 'application/json',
          Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
        }
      }

      dispatch({type: FETCH_AUTH})
      const response = await fetch(AUTH_API, reqObj);
      const json = await response.json();
      console.log(json)
      if (json.valid) {
        dispatch(setCurrentUser(json.current_user));
      }

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};
