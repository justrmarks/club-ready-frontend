import React from 'react'
import { startOfMonth, endOfMonth, startOfWeek, 
        endOfWeek, addDays} from 'date-fns'
import { connect } from 'react-redux'
import DateSquare from './dateSquare'

/* 
component to render date squares in a proper grid

 props = {
     events: [{event object}]
     month,
     day,
     year
 }
*/


const DateSquareGrid = (props) => {

     // setting variables
   
     const monthStart =startOfMonth(props.date);
     const monthEnd =endOfMonth(monthStart);
     const startDate =startOfWeek(monthStart);
     const endDate =endOfWeek(monthEnd);


 
  
     const rows = [];
 
     let days = [];
     let day = startDate;
     

 
     while (day <= endDate) {
       for (let i = 0; i < 7; i++) {
         days.push(
           <DateSquare key={day} date={day} />
         );
         day=addDays(day, 1);
       }
       rows.push(
         <div className="dateSquareRow" key={day}>
           {days}
         </div>
       );
       days = [];
     }


     return <div className="dateSquareGrid">{rows}</div>;


}

const mapStateToProps = (state) => {
    return {
        date: state.Calendar.selectedDate
    }
}

export default connect(mapStateToProps)(DateSquareGrid)


/* renderCells() {


    // setting variables

    const { currentMonth, selectedDate } = this.state;
    const monthStart =startOfMonth(currentMonth);
    const monthEnd =endOfMonth(monthStart);
    const startDate =startOfWeek(monthStart);
    const endDate =endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate =format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              isSameMonth(day, monthStart)
                ? "disabled"
                :isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClickparse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day =addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;*/