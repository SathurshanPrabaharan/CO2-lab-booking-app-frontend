import React from 'react';
import { Link } from 'react-router-dom';

const StaffPage = () => {
  // Example staff details fetched from the database
  const staffDetails = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    department: 'Human Resources',
    profession: 'HR Manager',
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 border border-gray-400 rounded-xl p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative ring ring-blue-100 ring-opacity-10 ring-offset-2 w-2/4">
        <h2 className="text-3xl text-black font-bold text-center mb-6">Staff Page</h2>
        <div className="my-4">
          <p className="text-lg text-black">Name: {staffDetails.name}</p>
          <p className="text-lg text-black">Email: {staffDetails.email}</p>
          <p className="text-lg text-black">Department: {staffDetails.department}</p>
          <p className="text-lg text-black">Profession: {staffDetails.profession}</p>
        </div>
        <Link to="/register">
          <button className="w-full mt-6 text-lg bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Add new staff
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StaffPage;
