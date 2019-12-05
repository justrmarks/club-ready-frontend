import React, { Component } from 'react'
import GoingButton from './GoingButton'
import { connect } from 'react-redux'
import { getEvent } from '../../store/actions/event'
import CircularProgress from '@material-ui/core/CircularProgress'
import style from '../stylesheets/eventShowPage.css'
import { Typography } from '@material-ui/core'
import {format, parseISO} from 'date-fns/'
import {Image} from 'semantic-ui-react'
import {Link } from 'react-router-dom'
import CommentFeed from './Comments/CommentFeed'

class EventShowPage extends Component {
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.showEvent(id)
    }


render() {
    let imageSrc;
    const {event} = this.props
    const accessibility = event && event.accessibility 
    const formattedStartTime = event && format(parseISO(event.start_time), "MMMM dd @ h:mm")
    const formattedEndTime = event && format(parseISO(event.end_time), "h:mm")
    if (!this.props.requesting && event) {
    imageSrc = this.props.event && this.props.event.image_src ? this.props.event.image_src : "/default.png"
    return (
        <div className="eventShowPage" style={style}>
            <div className="eventData"> 
          
                <div className="eventTitleCard">
                    <div className="eventTitleText">
                        <Typography component="h2" variant="h2">
                            {event.title}
                        </Typography>
                        <p component="h3" variant="h3">
                            {`${formattedStartTime} - ${formattedEndTime}`}
                        </p>
                        <p>{this.props.event.location}</p>
                        <Link to={`/organizers/${this.props.event.host.id}`}>{this.props.event.host.name}</Link>
                        <GoingButton event={this.props.event}/>
                    </div>
                    
                    <Image className="eventShowImage" src={imageSrc} alt={`Flier for ${event.title} on ${formattedStartTime}`}/>
                </div>
                

                
                

                <div className="generalInfo">
                    <div className="eventAccessiblity">
                        <h3>Accessiblity </h3>
                        <p>{ {'no_water':"No water ~ BYO",
                                    'water_for_sale':"Water for Sale",
                                    'free_water':"Free water available"}[accessibility.water] }</p>
                        <p>bathrooms: {{'no_bathrooms':"No bathrooms",
                                    'portos':"Porto-potties",
                                    'single_stalls':"Single bathrooms",
                                    'gendered_bathrooms': "Gendered bathrooms only",
                                    'all_gender':"All Gender Bathrooms"}[accessibility.bathrooms]}</p>
                        <p>flashing Lights: {event.accessibility.flashing_lights ? "Yes": "none"}</p>
                        <p>Mobility: {{'inaccessible':"This space is not accessible",
                                    'partially_accessible':"This space is partially accessible",
                                    'wheelchair_accessible': "This space is wheelchair accessible"}[accessibility.mobility]}</p>
                    </div>
                    <div className="eventDescription"> 
                        <h3>Description </h3>
                        <p> {this.props.event.description}</p> 
                    </div>

                </div>
            </div>
            
            <CommentFeed comments={event.comments} />

    </div> )
        }
        else {
            return (<CircularProgress/>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.Event.show,
        requesting: state.Event.requesting
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showEvent: (id) => dispatch(getEvent(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventShowPage)