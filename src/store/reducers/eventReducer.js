const eventReducer = (state = { all: [], hosting: [], requesting: true, show: null}, action) => {
    let newEvents
    switch (action.type) {
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
            newEvents = state.all.filter(event=> event.id != action.event.id)
            action.event.attending = true
            newEvents.push(action.event)
            return {
                ...state,
                all: newEvents
            }
        case "DELETE_ATTEND":
            newEvents = state.all.filter(event=> event.id != action.event.id)
            return {
                ...state,
                all: newEvents
            }

        default:
            return {...state
        }
        }
  };
  
  export default eventReducer;
  