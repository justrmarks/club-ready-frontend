import React, { Component } from 'react'
import { connect } from 'react-redux'
import DateSquareGrid from './dateSquareGrid'
import CalendarHeader from './calendarHeader'



 

class Calendar extends Component {


    componentDidMount() {

    }


    render () {
        return (
            <div className="calendarComponent" border="1x solid black">
                <CalendarHeader date={this.props.date} />
                <DateSquareGrid />
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
       events: state.Calendar.events,
       date: state.Calendar.selectedDate
    }
}

export default connect(mapStateToProps)(Calendar)

