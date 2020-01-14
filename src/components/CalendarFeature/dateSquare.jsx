import React from 'react'
import { connect } from 'react-redux'
import { isSameDay, format, parseISO, isSameMonth, isAfter, addDays} from 'date-fns'
import EventItem from './eventItem'
import { selectDate, fetchEvents} from '../../store/actions/calendar'
import {Button} from '@material-ui/core'



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
            if (!isSameMonth(props.selectedDate, props.date)) {
                props.fetchEvents(props.date)
            }
            props.selectDate(props.date)
            
        }
    }


    const eventItems = props.events.map(event => <EventItem event={event} key={event.id}/>)
    const activeClass = isSameDay(props.selectedDate, props.date) ? " activeDateSquare" : ""
    const pastClass = isAfter(addDays(new Date(), -1), props.date) ? " past" : ""
    return (<div className={"dateSquare" + pastClass + activeClass } onClick={handleClick}>
        <span className="dateNumber">{formattedDate}</span>
        <ol className="eventList">
            {eventItems.length > 2 ? <> {eventItems.slice(0,2)} <Button className="showMore">...</Button></> : eventItems}
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return { selectDate: (date) => {
        dispatch(selectDate(date))},
        fetchEvents: (date)=> dispatch(fetchEvents(date.getMonth()+1))  };
  };

export default connect(mapStateToProps, mapDispatchToProps)(dateSquare)