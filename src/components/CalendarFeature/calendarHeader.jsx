import React from 'react';
import format from 'date-fns/esm/format'
import addDays from 'date-fns/esm/addDays'
import addMonths from 'date-fns/addMonths'
import startOfWeek from 'date-fns/startOfWeek'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import {selectDate} from '../../store/actions/calendar'
import {fetchEvents} from '../../store/actions/calendar'

const CalendarHeader = (props) => {

    const startDate = startOfWeek(props.selectedDate);
    const days = new Array(7).fill("day")
    const months = new Array(12).fill("month")

    const weekdays = days.map( (day,index) => {
        return (<h3 key={index} className="dayName">
            {format(addDays(startDate, index), 'eee')}
        </h3>)})


    const monthOptions = months.map((element, index) => {
        const month = addMonths(props.selectedDate,index-6)
    return <MenuItem key={index} value={month}>{format(month, "MMM yyyy")}</MenuItem>
        }) 
        


    const handleChange = (e) => {
        const date = e.target.value;
        props.selectDate(date);
        props.fetchEvents(props.selectedDate.getMonth())
    }

     
        return (
           <div className="calenderHeader">
               <h2 className="calendarPageTitle">Calender</h2>
                <div className="calendarPicker">  
                    <div float="left"> {format(props.selectedDate, "MMMM")} </div>
                        <Select value={props.selectedDate} onChange={handleChange} renderValue={date => `${format(date, "MMM/yy")}`}>
                            {monthOptions}
                         </Select>
                    <div float="right">{format(props.selectedDate, "yyyy")} </div>
                </div>
                <div className="dayNameRow">
                    {weekdays}
                </div>
            </div>

        )
    }

    const mapStateToProps = (state) => {
        return {
            selectedDate: state.Calendar.selectedDate
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return { selectDate: (date) => {dispatch(selectDate(date))},
        fetchEvents: (month) => {dispatch(fetchEvents(month))} };
      };
    
export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeader)
