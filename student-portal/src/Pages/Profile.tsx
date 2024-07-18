import React from "react";
import ProfileCard from "../Components/ProfileCard";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("Course_Update");
  };

  return (
    <div className=" lg:flex  mx-auto">
      <div className="profile card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 p-4 lg:p-10 ml-10 mr-10 mb-6 lg:ml-20 border border-gray-600 w-80 md:w-3/4 lg:w-1/3 md:m-10 md:ml-20">
        <ProfileCard />
      </div>
      <div className="Module card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700  p-4 lg:p-10 lg:pb-20 ml-10 mr-10 lg:ml-3 lg:mr-20 border border-gray-600 w-80  block relative md:w-3/4 md:ml-20 lg:w-3/4">
        <div className="text-black text-xl  md:text-3xl text-center mb-5 font-Poppins font-bold">
          Enrolled Course Modules
        </div>
        <div class="relative overflow-hidden shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-black">
            <thead class="text-sm md:text-lg  bg-gradient-to-l from-slate-500 to-slate-100 opacity-95">
              <tr>
                <th scope="col" class="px-6 py-3 text-center">
                  Course Code
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Course
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
              <tr class="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black whitespace-nowrap"
                >
                  EC6060
                </th>
                <td class="px-6 py-4">SOFTWARE ENGINEERING</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="block lg:hidden">
          <div class="p-6 bg-white dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300">
            <button
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white md:text-xl md:py-1 md:px-6 rounded-b-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce absolute right-0 bottom-0 mr-4 mb-3 font-Poppins"
            >
              Update
            </button>
          </div>
        </div>

        <div class="hidden lg:block">
          <div>
            <button
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white md:text-xl md:py-1 md:px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce absolute right-0 bottom-0 mr-3 mb-3 font-Poppins"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
