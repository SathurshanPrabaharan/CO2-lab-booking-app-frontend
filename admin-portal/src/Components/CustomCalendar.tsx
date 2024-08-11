import React, { useState } from 'react';

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const CustomCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="w-full max-w-full rounded-lg border border-gray-300 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800">
      <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700">
        <button onClick={handlePrevMonth} className="text-gray-700 dark:text-gray-300">Previous</button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {`${currentDate.toLocaleString('default', { month: 'long' })} ${year}`}
        </h2>
        <button onClick={handleNextMonth} className="text-gray-700 dark:text-gray-300">Next</button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="grid grid-cols-7 rounded-t-lg bg-gray-900 text-white">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <th key={index} className="flex items-center justify-center p-2 text-sm font-semibold md:text-base">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Create empty cells for days before the 1st of the month */}
          <tr className="grid grid-cols-7">
            {emptyDays.map((_, index) => (
              <td key={`empty-${index}`} className="relative h-20 border-t border-gray-300 dark:border-gray-700 p-2"></td>
            ))}
            {daysArray.slice(0, 7 - emptyDays.length).map((day) => (
              <td key={day} className={`relative h-20 border-t border-gray-300 dark:border-gray-700 p-2 transition-colors duration-200 ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-blue-100 dark:bg-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                <span className={`text-gray-800 dark:text-gray-200 ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'font-bold' : ''}`}>{day}</span>
              </td>
            ))}
          </tr>
          {/* Create the remaining weeks */}
          {Array.from({ length: Math.ceil((daysInMonth - (7 - emptyDays.length)) / 7) }).map((_, rowIndex) => (
            <tr key={rowIndex} className="grid grid-cols-7">
              {daysArray.slice(rowIndex * 7 + (7 - emptyDays.length), (rowIndex + 1) * 7 + (7 - emptyDays.length)).map((day) => (
                <td key={day} className={`relative h-20 border-t border-gray-300 dark:border-gray-700 p-2 transition-colors duration-200 ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'bg-blue-100 dark:bg-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <span className={`text-gray-800 dark:text-gray-200 ${day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? 'font-bold' : ''}`}>{day}</span>
                </td>
              ))}
              {Array.from({ length: 7 - (daysArray.length % 7) }).map((_, index) => (
                <td key={`empty-end-${index}`} className="relative h-20 border-t border-gray-300 dark:border-gray-700 p-2"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomCalendar;
