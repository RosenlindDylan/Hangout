import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './datecomponent.module.css'
import 'react-datepicker/dist/react-datepicker.css';

function DateComponent() {
    const [date, setDate] = useState(new Date());
  
    //  function to handle date selection
    const handleDateSelect = (selectedDate) => {
      console.log('Date selected:', selectedDate)
    };
  
    // function to handle date change
    const handleDateChange = (selectedDate) => {
      setDate(selectedDate);
    };
      
    return (
      <div className={styles.calendar}>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          timeIntervals={15}
        />
      </div>
    );
  }
  
  export default DateComponent;
  