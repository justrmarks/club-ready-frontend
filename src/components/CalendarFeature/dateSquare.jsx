import React from 'react'
import { connect } from 'react-redux'
import { isSameDay, format, parseISO} from 'date-fns'
import EventItem from './eventItem'
import { selectDate} from '../../store/actions/calendar'


/* 
component to represent a single day that can hold many events
 props = {
     events: [{event object}]
     month,
     day,
     year
 }
*/

const dateSquare = (props) => {
    
    const formattedDate = format(props.date, "d")
    const handleClick = () => {
        if( !isSameDay(props.selectedDate, props.date)) {
            props.selectDate(props.date)
        }
    }


    const eventItems = props.events.map(event => <EventItem event={event} key={event.id}/>)
    const activeClass = isSameDay(props.selectedDate, props.date) ? " activeDateSquare" : ""
    return (<div className={"dateSquare" + activeClass} onClick={handleClick}>
        <span className="dateNumber">{formattedDate}</span>
        <ol className="eventList">
            {eventItems}
        </ol>
    </div>)


}



const mapStateToProps = (state, ownProps) => {
    const events=  state.Calendar.events.filter(event=> {
        return isSameDay(parseISO(event.start_time), ownProps.date)
    }) 
    return {
        events,
        selectedDate: state.Calendar.selectedDate
    }
}

const mapDispatchToProps = (dispatch) => {
    return { selectDate: (date) => dispatch(selectDate(date)) };
  };

export default connect(mapStateToProps, mapDispatchToProps)(dateSquare)