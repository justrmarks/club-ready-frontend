const calendarReducer = (state = { events: [], requesting: false, currentDate: new Date(), selectedDate: new Date() }, action) => {
    switch (action.type) {
      case "FETCH_EVENTS":
        return {
          ...state,
          requesting: true
        }
  
      case "SET_EVENTS":
        return {
          ...state,
          events: action.events,
          requesting: false
        };
      case "SELECT_DATE":
        return {
          ...state,
          selectedDate: action.date
        }
  
      default:
        return {...state,
        requesting: false
      }
    }
  };
  
  export default calendarReducer;
  