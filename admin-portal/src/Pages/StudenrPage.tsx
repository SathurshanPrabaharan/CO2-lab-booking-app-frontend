import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const StudentPage = () => {
  // Example student details fetched from the database
  const studentDetails = [
    {
      id: 1,
      name: 'Emma Brown',
      email: 'emma.brown@example.com',
      department: 'Computer Science',
      semester: '2nd',
    },
    {
      id: 2,
      name: 'Liam Johnson',
      email: 'liam.johnson@example.com',
      department: 'Electrical Engineering',
      semester: '4th',
    },
    {
      id: 3,
      name: 'Olivia Williams',
      email: 'olivia.williams@example.com',
      department: 'Mechanical Engineering',
      semester: '1st',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl text-black font-bold text-center mb-6">Student Page</h2>
        <ul className="space-y-4">
          {studentDetails.map((student) => (
            <li key={student.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg text-black">Name: {student.name}</p>
                <p className="text-lg text-black">Email: {student.email}</p>
                <p className="text-lg text-black">Department: {student.department}</p>
                <p className="text-lg text-black">Semester: {student.semester}</p>
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
              Add New Student
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
