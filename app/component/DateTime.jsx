import React, { HTMLAttributes } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './datetime.css';
import { subDays } from 'date-fns';
const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}) => {
  return (
    <ReactDatePicker
      showTimeInput
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      minDate={subDays(new Date(), 0)}
      showPopperArrow={showPopperArrow}
      {...props}
    />
  );
};

export default DatePicker;
