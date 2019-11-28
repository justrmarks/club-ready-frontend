import React from 'react'
import { format, parseISO} from 'date-fns'


// props = { event: [event object from redux store]}
const EventItemDetail = (props) => {
    const parsedDate = parseISO(props.event.start_time)
    const formattedTime = format(parsedDate, 'h:mmaa')
    

    return (<div className="eventDetailItem"> 
        <h4>{props.event.title}</h4>
        <h5>host: {props.event.host.name}</h5>
            <p> @{formattedTime}</p>
            <p> {props.event.description}</p>
        </div> )
}



export default EventItemDetail;