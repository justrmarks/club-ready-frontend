import React, { Component } from 'react'
import GoingButton from './GoingButton'
import { connect } from 'react-redux'
import { getEvent } from '../../store/actions/event'
import CircularProgress from '@material-ui/core/CircularProgress'
import style from '../stylesheets/eventShowPage.css'
import { Card, CardMedia, CardContent, CardHeader, Typography } from '@material-ui/core'
import {format, parseISO} from 'date-fns/'

class EventShowPage extends Component {
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.showEvent(id)
    }


render() {
    let imageSrc;
    const {event} = this.props
    if (!this.props.requesting) {
    imageSrc = this.props.event.image_src ? this.props.event.image_src : "/default.png"

    

    return (
        <div className="eventShowPage" style={style}>
            <Card className="eventTitleCard">
                
                    <Typography component="h2" variant="h2">
                        {event.title}
                    </Typography>

                <img src={imageSrc} alt={`Flier for ${event.title} on ${format(parseISO(event.start_time), "MMMM Do @ h:mm")}`}/>
            </Card>
            

            <div className="generalInfo">
                <a href={`/organizers/${this.props.event.host.id}`}>{this.props.event.host.name}</a>
                <p>{this.props.event.location}</p>

                <div className="eventDescription"> 
                    <p> {this.props.event.description}</p> 
                </div>

            </div>

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