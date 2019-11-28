import React from 'react';
import format from 'date-fns/esm/format'
import addDays from 'date-fns/esm/addDays'
import startOfWeek from 'date-fns/startOfWeek'

const CalendarHeader = (props) => {

    const startDate = startOfWeek(props.date);
    const days = new Array(7).fill("day")

    const weekdays = days.map( (day,index) => {
        return (<p key={index} className="dayName">
            {format(addDays(startDate, index), 'eeee')}
        </p>)
    })

        return (
           <div className="calenderHeader">
               <h2>Calender</h2>
                <div className="calendarPicker">  
                    <p float="left">{format(props.date, "MMMM")} </p>
                    <p float="right">{format(props.date, "yyyy")} </p>
                </div>
                <div className="dayNameRow">
                    {weekdays}
                </div>
            </div>

        )
    }


export default CalendarHeader
