import { combineReducers } from "redux";
import Auth from "./authReducer";
import Calendar from './calendarReducer'
import Event from './eventReducer'

const rootReducer = combineReducers({
  Auth,
  Calendar,
  Event
});

export default rootReducer;
