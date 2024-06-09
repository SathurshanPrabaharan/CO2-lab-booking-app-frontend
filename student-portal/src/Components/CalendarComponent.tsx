import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent: React.FC = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="col-span-9">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CalendarComponent;
