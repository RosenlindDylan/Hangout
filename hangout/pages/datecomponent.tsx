import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './datecomponent.module.css'
import 'react-datepicker/dist/react-datepicker.css';


function DateComponent() {
    const [date, setDate] = useState(new Date());
  
    //  function to handle date selection
    const handleDateSelect = (selectedDate) => {
      console.log('Date selected:', selectedDate)
      // database logic will go here as well
    };
  
    // function to handle date change
    const handleDateChange = (selectedDate) => {
      setDate(selectedDate);
    };

    const handleSubmit = () => {
      console.log('Date submitted:', date)
    };


      
    return (
      <div className={styles.calendar}>
        <DatePicker
          selected={date}
          onSelect={handleDateSelect}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          timeIntervals={15}

        />

        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  }
  
  export default DateComponent;
  