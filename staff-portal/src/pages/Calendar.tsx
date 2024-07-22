import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, addMonths, subMonths } from 'date-fns';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8087/api/v1/bookings/valid-bookings?createdByStaffId=066fa2b4-5d28-44eb-a74e-3e44421980e8&page=1&size=10`);
        setBookings(response.data.data.results);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [currentDate]);

  // Get first and last day of the month
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startOfCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); // Sunday
  const endOfCalendar = endOfWeek(lastDayOfMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

  // Helper function to get events for a specific date
  const getEventsForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return bookings.filter(booking => booking.date === formattedDate);
  };

  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Calendar" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-between items-center p-4">
          <button onClick={handlePreviousMonth} className="text-primary hover:text-primary-dark">Previous</button>
          <span className="font-semibold text-lg">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button onClick={handleNextMonth} className="text-primary hover:text-primary-dark">Next</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
                <th key={index} className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                  <span className="hidden lg:block">{day}</span>
                  <span className="block lg:hidden">{day.slice(0, 3)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(days.length / 7) }).map((_, rowIndex) => (
              <tr key={rowIndex} className="grid grid-cols-7">
                {days.slice(rowIndex * 7, rowIndex * 7 + 7).map((date, colIndex) => {
                  const events = getEventsForDate(date);
                  const hasEvents = events.length > 0;
                  return (
                    <td
                      key={colIndex}
                      className={`ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${hasEvents ? 'bg-green-100 dark:bg-green-700' : ''}`}
                    >
                      <span className="font-medium text-black dark:text-white">
                        {format(date, 'd')}
                      </span>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {events.map(event => (
                          <div key={event.id}>{event.title}</div>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DefaultLayout>
  );
};

export default Calendar;
