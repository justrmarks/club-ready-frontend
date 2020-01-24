const LOGIN_API = 'http://localhost:3000/login'
const SIGNUP_API = 'http://localhost:3000/signup'
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
        headers: { 'Content-Type' : 'application/json'},
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
      const json = await response.json();
    
      dispatch(setCurrentUser(json.user));

    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
};

export const signup = (email, password, name) => {
  return async dispatch => {
    try {
    const reqObj = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({
          user: { 
              email,
              name,
              password
          }
      }) }

  const response = await fetch(SIGNUP_API, reqObj);
  const json = await response.json();
  dispatch(login(email, password));
  }
  catch (error) {
    console.error("Error Signing up", error)
  }
}

}

export const fetchCurrentUser = () => {
  return async dispatch => {
    try {
      const reqObj = {
        headers: { 'Content-Type' : 'application/json',
          Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
        }
      }

      dispatch({type: FETCH_AUTH})
      let json ={};
      try{
      const response = await fetch(AUTH_API, reqObj);
      json = await response.json();
      }
      catch (error) {
        console.log(error)
        json.valid = false
      }
      console.log(json)
      if (json.valid) {
        dispatch(setCurrentUser(json.current_user));
      }

    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };
};

export const CLEAR_AUTH = "CLEAR_AUTH";

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME)
  return {type: CLEAR_AUTH} }
