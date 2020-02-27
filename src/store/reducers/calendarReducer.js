import _ from 'lodash'


const calendarReducer = (state = { events: [], requesting: true, currentDate: new Date(), selectedDate: new Date() }, action) => {
  let newEvents;  

  
  switch (action.type) {
      case "FETCH_EVENTS":
        return {
          ...state,
          requesting: true
        }
  
      case "SET_EVENTS":
        return {
          ...state,
          events: _.unionBy(state.events, action.events, 'id'),
          requesting: false
        };
      case "SELECT_DATE":
        return {
          ...state,
          selectedDate: action.date
        }

      case "ATTEND_EVENT":
            newEvents = state.events.map(event => {
              if (event.id === action.event.id) {
                return action.event
              }
              else {
              return event
            }
            })

            return {
                ...state,
                events: newEvents
            }
      case "DELETE_ATTEND":
          newEvents = state.events.map(event => {
            if (event.id === action.event.id) {
              return action.event
            }
            else {
            return event
          }
          })

          return {
              ...state,
              events: newEvents
          }
  
      default:
        return {...state
      }
    }
  };
  
  export default calendarReducer;
  