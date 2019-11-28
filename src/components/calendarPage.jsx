import React, {Component} from 'react';
import Calendar from './CalendarFeature/calendar'
import CalendarDetails from './CalendarFeature/calendarDetails'
import { connect } from "react-redux";
import style from './stylesheets/calendarPage.css'
import { fetchEvents } from '../store/actions/calendar'


class CalendarPage extends Component {
  state = {
    userShow: {}
  };

  componentDidMount = () => {
    this.props.fetchEvents()

  };

  render() {

   
      return (
        <div style={style} className="calendarPage">
            <Calendar />
            <CalendarDetails />
        </div>
      ) }


}

const mapStateToProps = state => {
  return {
      events: state.events 
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return { fetchEvents: (year) => dispatch(fetchEvents(year)) };
  };


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarPage);
