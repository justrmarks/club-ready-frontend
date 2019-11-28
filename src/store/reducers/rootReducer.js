import { combineReducers } from "redux";
import Auth from "./authReducer";
import Calendar from './calendarReducer'

const rootReducer = combineReducers({
  Auth,
  Calendar
});

export default rootReducer;
