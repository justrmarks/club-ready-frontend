const AUTH_TOKEN_NAME = "project-sploopy authorization"
const EVENTS_INDEX = process.env.API_ROOT+'/events'

export const FETCH_EVENTS = "FETCH_EVENTS"
export const SET_EVENTS = "SET_EVENTS"

export const setEvents = events => ({ type: SET_EVENTS, events});

export const fetchEvents = (month) => {
    return async dispatch => {
      try {
        const reqObj = {
          method: 'GET',
          headers: { 'Content-Type' : 'application/json',
            Authorization: localStorage.getItem(AUTH_TOKEN_NAME)
          }
        }
        const events_endpoint = month ? `${EVENTS_INDEX}?month=${month}` : EVENTS_INDEX
        

        dispatch({type: FETCH_EVENTS})
        const response = await fetch(events_endpoint, reqObj);
        const json = await response.json();
        const events = json.events.map(event=> {
            let result = event.data.attributes;
            return result;
        }
            )
        dispatch(setEvents(events));
  
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  };

  export const SELECT_DATE = "SELECT_DATE"
  export const selectDate = date => {
    return { type: SELECT_DATE, date} };
    

  