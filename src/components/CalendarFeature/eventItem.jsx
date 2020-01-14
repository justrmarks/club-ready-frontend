import React, {Component} from 'react'
import { format, parseISO, isAfter} from 'date-fns'
import { Link } from 'react-router-dom'


// props = { event: [event object from redux store]}
class EventItem extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }


    render() {
    const event = this.props.event
    const parsedDate = parseISO(event.start_time)
    const formattedTime = format(parsedDate, 'h:mmaa')

  
   

    return (<li className={`eventItem ${isAfter(new Date(), parsedDate) ? "past" : ""} ${event.attending ? "attending" : ""}`} onMouseOver={this.handleOpen} onMouseLeave={this.handleClose}>
       { this.state.open ? <> <Link to={`/events/${event.id}`}className="eventName">{event.title}</Link>
        <div className="hostName">{event.host.name}</div>
        <div className="startTime">{formattedTime}</div> </> : <span></span> }
    </li>) }


}



export default EventItem