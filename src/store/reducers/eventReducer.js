const eventReducer = (state = { attending: [], hosting: [], requesting: true, show: null}, action) => {
    switch (action.type) {
        case "FETCH_ATTENDING":
            return {
            ...state,
            requesting: true}
        
        case "SET_ATTENDING":
            return {
            ...state,
            attending: action.events,
            requesting: false
            }

        case "FETCH_HOST_EVENTS":
            return {
            ...state,
            requesting: true
            }
  
        case "SET_HOST_EVENTS":
            return {
            ...state,
            hosting: action.events,
            requesting: false
            };
        case "CREATE_EVENT":
            return {
                ...state,
                requesting: true
            }
        case "ADD_HOST_EVENT":
            const newEvents = state.hosting
            newEvents.push(action.event)
            return {
                ...state,
                hosting: newEvents
            }

        case "GET_SHOW":
            return {
                ...state,
                requesting: true
            }
        case "SET_SHOW":
            return {
            ...state,
            show: action.event,
            requesting: false
            };
        case "ATTEND_EVENT":
            const newAttending = state.attending.filter(event=> event.id != action.event.id)
            action.event.attending = true
            newAttending.push(action.event)
            return {
                ...state,
                attending: newAttending
            }
        case "DELETE_ATTEND":
            const deletedAttending = state.attending.filter(event=> event.id != action.event.id)
            return {
                ...state,
                attending: deletedAttending
            }

        default:
            return {...state
        }
        }
  };
  
  export default eventReducer;
  