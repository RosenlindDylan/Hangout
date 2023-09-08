import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function DateComponent() {
    const [date, setDate] = useState(new Date());
  
    // Custom function to handle date selection (onSelect)
    const handleDateSelect = (selectedDate) => {
      // This function is called when a day is clicked
      console.log('Date selected:', selectedDate);
      // You can perform additional actions here if needed
    };
  
    // Custom function to handle date change (onChange)
    const handleDateChange = (selectedDate) => {
      // This function is called when the date value has changed
      setDate(selectedDate);
      console.log('Date changed:', selectedDate);
      // You can also perform additional actions here if needed
    };
  
    return (
      <DatePicker
        selected={date}
        onSelect={handleDateSelect}
        onChange={handleDateChange}
        // You can add other props like minDate, maxDate, dateFormat, etc.
      />
    );
  }
  
  export default DateComponent;
  