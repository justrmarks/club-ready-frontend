import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose';

import EventItemDetail from '../CalendarFeature/eventItemDetail'


class EventHostingPage extends Component {




render() {

        const PoseItem = posed.li({
            enter: { x: 0, 
                transition: ({i})=>  ({delay: i * 200 }),
                opacity: 1 },
            exit: { x: 100, opacity: 0 }
        });

        const events = this.props.events.map( (event, index)=> {
            return ( <PoseItem key={event.id} i={index}> <EventItemDetail event={event}/> </PoseItem> )
        })

    return (<div className="calendarDetails"> 
    <ol className="eventList">
        <PoseGroup animateOnMount={true}> 
                {events.length > 0 ? events: ""}
        </PoseGroup>
    </ol>
    
    </div>)
}

}



export default EventHostingPage