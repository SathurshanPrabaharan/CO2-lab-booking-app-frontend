import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StaffPage = () => {
  // Example staff details fetched from the database
  const staffDetails = [
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      department: 'Human Resources',
      profession: 'HR Manager',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Finance',
      profession: 'Financial Analyst',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      department: 'IT',
      profession: 'Software Engineer',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl text-black font-bold text-center mb-6">Staff Page</h2>
        <ul className="space-y-4">
          {staffDetails.map((staff) => (
            <li key={staff.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg text-black">Name: {staff.name}</p>
                <p className="text-lg text-black">Email: {staff.email}</p>
                <p className="text-lg text-black">Department: {staff.department}</p>
                <p className="text-lg text-black">Profession: {staff.profession}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-6">
          <Link to="/register">
            <button className="text-lg bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Add New Staff
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;
