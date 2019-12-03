import React, { Component } from 'react'
import { connect } from 'react-redux'
import DateSquareGrid from './dateSquareGrid'
import CalendarHeader from './calendarHeader'
import CircularProgress from '@material-ui/core/CircularProgress'



 

class Calendar extends Component {


    componentDidMount() {

    }


    render () {
        return (
            <div className="calendarComponent" border="1x solid black">
                <CalendarHeader />
                {this.props.requesting ? <CircularProgress className="calendarProgress"/> : <DateSquareGrid />}
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
       events: state.Calendar.events,
       date: state.Calendar.selectedDate,
       requesting: state.Calendar.requesting
    }
}

export default connect(mapStateToProps)(Calendar)

