import React from 'react'
import { format, parseISO} from 'date-fns'



// props = { event: [event object from redux store]}
const EventItem = (props) => {
    const parsedDate = parseISO(props.event.start_time)
    const formattedTime = format(parsedDate, 'h:mmaa')

    return (<li className="eventItem">
        <div className="EventName">{props.event.title}</div>
        <div className="HostName">{props.event.host.name}</div>
        <div className="startTime">{formattedTime}</div>
    </li>)


}



export default EventItem