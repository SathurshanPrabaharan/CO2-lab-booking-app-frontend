import { useState } from 'react';

interface LabBooking {
  id: number;
  date: string;
  time: string;
  courseCode: string;
  labName: string;
  approved: boolean;
}

const labBookings: LabBooking[] = [
  {
    id: 1,
    date: '2024-06-15',
    time: '10:00 AM',
    courseCode: 'CS101',
    labName: 'Physics Lab',
    approved: true,
  },
  {
    id: 2,
    date: '2024-06-17',
    time: '2:00 PM',
    courseCode: 'MATH201',
    labName: 'Chemistry Lab',
    approved: false,
  },
];

const TableOne = () => {
  const [bookings, setBookings] = useState<LabBooking[]>(labBookings);

  const cancelBooking = (id: number) => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== id)
    );
  };

  const rebook = (id: number) => {
    // Add rebooking logic here
    console.log('Rebooking lab with ID:', id);
  };

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
            <h5 className="text-sm font-medium uppercase xsm:text-base">Time</h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Course Code
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
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
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
              <span className="block sm:hidden font-medium">Time:</span>
              <p className="text-black dark:text-white">{booking.time}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Course Code:</span>
              <p className="text-black dark:text-white">{booking.courseCode}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Lab Name:</span>
              <p className="text-black dark:text-white">{booking.labName}</p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              <span className="block sm:hidden font-medium">Status:</span>
              <p className="text-black dark:text-white">
                {booking.approved ? 'Approved' : 'Pending'}
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-center p-2.5 xl:p-5">
              {booking.approved ? (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                  onClick={() => rebook(booking.id)}
                >
                  Rebook
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
