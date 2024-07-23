import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Course {
  id: string;
  code: string;
  name: string;
  courseType: string;
  department: string;
  semester: number;
}

interface LabBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  course: Course;
  bookingStatus: string;
  title: string;
}

const TableOne = () => {
  const [bookings, setBookings] = useState<LabBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8087/api/v1/bookings/valid-bookings?createdByStaffId=4a2ca96b-a846-476a-b8df-d5007af084fb&page=1&size=10')
      .then((response) => {
        setBookings(response.data.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, []);

  const cancelBooking = (id: string) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  const rebook = (id: string) => {
    // Add rebooking logic here
    console.log('Rebooking lab with ID:', id);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Upcoming Lab Bookings
      </h4>

      <div className="flex flex-col">
        <div className="hidden sm:grid sm:grid-cols-5 lg:grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Date
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Start Time</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">End Time</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Course Code
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Course Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lab Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Status</h5>
          </div>
        </div>

        {bookings.map((booking) => (
          <div
            className="flex flex-col sm:grid sm:grid-cols-5 lg:grid-cols-7 border-b border-stroke dark:border-strokedark"
            key={booking.id}
          >
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Date:</span>
              <p className="text-black dark:text-white">{booking.date}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Start Time:</span>
              <p className="text-black dark:text-white">{booking.startTime}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">End Time:</span>
              <p className="text-black dark:text-white">{booking.endTime}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Course Code:</span>
              <p className="text-black dark:text-white">{booking.course.code}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Course Name:</span>
              <p className="text-black dark:text-white">{booking.course.name}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Title:</span>
              <p className="text-black dark:text-white">{booking.title}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Status:</span>
              <p className="text-black dark:text-white">
                {booking.bookingStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
