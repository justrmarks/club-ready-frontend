
const EVENTS_INDEX = 'http://localhost:3000/events'
export const FETCH_EVENTS = "FETCH_EVENTS"
export const SET_EVENTS = "SET_EVENTS"

export const setEvents = events => ({ type: SET_EVENTS, events});

export const fetchEvents = (year) => {
    return async dispatch => {
      try {
        const reqObj = {
          method: 'GET',
          headers: { 'Content-Type' : 'application/json',
            Authorization: localStorage.getItem("authorization")
          }
        }
        const events_endpoint = year ? `${EVENTS_INDEX}?year=${year}` : EVENTS_INDEX
        

        dispatch({type: FETCH_EVENTS})
        const response = await fetch(events_endpoint, reqObj);
        const json = await response.json();
        const events = json.events.map(event=> {
            let result = event.data.attributes;
            result.attendees = result.attendees.map(att=> att.data.attributes) 
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
  export const selectDate = date => ({ type: SELECT_DATE, date});

  