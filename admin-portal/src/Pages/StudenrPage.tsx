import React from 'react';
import { Link } from 'react-router-dom';

const StudentPage = () => {
  // Example student details fetched from the database
  const studentDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    registrationNumber: 'ST12345',
    semester: '3rd',
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-200 border border-gray-400 rounded-xl p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative ring ring-blue-100 ring-opacity-10 ring-offset-2 w-2/4">
        <h2 className="text-3xl text-black font-bold text-center mb-6">Student Page</h2>
        <div className="my-4">
          <p className="text-lg text-black">Name: {studentDetails.name}</p>
          <p className="text-lg text-black">Email: {studentDetails.email}</p>
          <p className="text-lg text-black">Registration Number: {studentDetails.registrationNumber}</p>
          <p className="text-lg text-black">Semester: {studentDetails.semester}</p>
        </div>
        <Link to="/register">
          <button className="w-full mt-6 text-lg bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Add new Student
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentPage;
