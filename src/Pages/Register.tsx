import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaIdBadge } from "react-icons/fa";

const Register = () => {
  const [isStudent, setIsStudent] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-slate-800 border border-slate-400 rounded-xl p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative ring ring-blue-100 ring-opacity-10 ring-offset-2">
        <h2 className="text-3xl text-white font-bold text-center mb-6">Register</h2>
        <div className="flex justify-center mb-6">
          <button
            className={`mx-2 px-4 py-2 rounded-full ${isStudent ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setIsStudent(true)}
          >
            Student
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded-full ${!isStudent ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setIsStudent(false)}
          >
            Staff
          </button>
        </div>

        <form>
          <div className="my-4 relative">
            <label htmlFor="name" className="block text-left mb-2 text-xl text-white">Name</label>
            <div className="relative">
              <input type="text" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaUser className="text-black" />
              </div>
            </div>
          </div>

          <div className="my-4 relative">
            <label htmlFor="email" className="block text-left mb-2 text-xl text-white">Email</label>
            <div className="relative">
              <input type="email" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaEnvelope className="text-black" />
              </div>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-left mb-2 text-xl text-white">Password</label>
            <div className="relative">
              <input type="password" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaLock className="text-black" />
              </div>
            </div>
          </div>

          <div className="my-4 relative">
            <label htmlFor="department_id" className="block text-left mb-2 text-xl text-white">Department ID</label>
            <div className="relative">
              <input type="text" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaIdBadge className="text-black" />
              </div>
            </div>
          </div>

          <div className="my-4 relative">
            <label htmlFor="profession_id" className="block text-left mb-2 text-xl text-white">Profession ID</label>
            <div className="relative">
              <input type="text" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaIdBadge className="text-black" />
              </div>
            </div>
          </div>

          {isStudent && (
            <>
              <div className="my-4 relative">
                <label htmlFor="reg_num" className="block text-left mb-2 text-xl text-white">Registration Number</label>
                <div className="relative">
                  <input type="text" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaIdBadge className="text-black" />
                  </div>
                </div>
              </div>

              <div className="my-4 relative">
                <label htmlFor="semester" className="block text-left mb-2 text-xl text-white">Semester</label>
                <div className="relative">
                  <input type="text" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaIdBadge className="text-black" />
                  </div>
                </div>
              </div>
            </>
          )}

          {isStudent === false && (
            <div className="my-4 relative">
              <label htmlFor="responsible_course_modules" className="block text-left mb-2 text-xl text-white">Responsible Course Modules</label>
              <div className="relative">
                <input type="text" className="pl-10 pr-14 w-80 bg-white text-black text-lg font-bold rounded-full h-12 focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaIdBadge className="text-black" />
                </div>
              </div>
            </div>
          )}

          <button
            className="w-full mb-4 text-[18px] mt-10 rounded-full bg-emerald-600 text-white hover:text-white py-2 duration-100 border-none transform transition-transform hover:scale-110 active:outline-none active:border-none outline-none"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
