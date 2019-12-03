import React from 'react'
import { format, parseISO} from 'date-fns'
import GoingButton from '../Events/GoingButton'
import ContactButton from '../Events/ContactButton'
import {Link } from 'react-router-dom'


// props = { event: [event object from redux store]}
const EventItemDetail = ({event}) => {
    const parsedDate = parseISO(event.start_time)
    const formattedTime = format(parsedDate, 'h:mmaa')
    const summaryEnd = 250
    const {accessability} = event
    

    
    return (<div className="eventItemDetail"> 
            <Link to={`/events/${event.id}`}><h4 className="eventItemDetailTitle">{event.title} </h4></Link>
            <div className="eventItemDetailInfo"> 
                <h5>host: {event.host.name}</h5>
                    <p> location:{event.location}</p>
                    <p> starts @{formattedTime}</p>
                    <p> {event.description.length > summaryEnd ? `${event.description.substring(0,summaryEnd)}...`: event.description}</p>
            </div>
            <div className="eventItemDetailAccessability"> 
                <p>{ {'no_water':"No water ~ BYO",
                            'water_for_sale':"Water for Sale",
                            'free_water':"Free water available"}[accessability.water] }</p>
                <p>bathrooms: {{'no_bathrooms':"No bathrooms",
                            'portos':"Porto-potties",
                            'single_stalls':"Single bathrooms",
                            'gendered_bathrooms': "Gendered bathrooms only",
                            'all_gender':"All Gender Bathrooms"}[accessability.bathrooms]}</p>
                <p>flashing Lights: {event.accessability.flashing_lights ? "yes": "none"}</p>
                <p>Mobility: {event.accessability.mobility}</p>
            </div>
            <div className="eventItemDetailBtns">
                <GoingButton event={event} />
                <ContactButton host={event.host} />
            </div>

    </div> )
}



export default EventItemDetail;