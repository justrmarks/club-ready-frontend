import React from 'react'
import { connect } from 'react-redux'
import { isSameDay, format, parseISO} from 'date-fns'
import posed, { PoseGroup } from 'react-pose';

import EventItemDetail from './eventItemDetail'


const CalendarDetails = (props) => {


      const PoseList = posed.ol({
        enter: { staggerChildren: 50,

        },
        exit: { staggerChildren: 20, staggerDirection: -1 }
      })
      const PoseItem = posed.li({
        enter: { x: 0, 
            transition: ({i})=>  ({delay: i * 200 }),
            opacity: 1 },
        exit: { x: 50, opacity: 0 }
      });

const events = props.events.map( (event, index)=> {
    return ( <PoseItem key={event.id} i={index}> <EventItemDetail event={event}/> </PoseItem> )
})
    return (<div className="calendarDetails"> 
    <h3>{format(props.selectedDate, "eeee, MMMM d")} </h3>
    <ol className="eventList">
        <PoseGroup animateOnMount={true}> 
                {events.length > 0 ? events: ""}
        </PoseGroup>
    </ol>
    
    </div>)

}

const mapStateToProps = (state) => {
    const events=  state.Calendar.events.filter(event=> {
        return isSameDay(parseISO(event.start_time), state.Calendar.selectedDate)
    }) 
    return {
        events,
        selectedDate: state.Calendar.selectedDate
    }
} 

export default connect(mapStateToProps)(CalendarDetails)