import React from "react";
import ProfileCard from "../Components/ProfileCard";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("Course_Update");
  };

  return (
    <div className="flex mx-auto gap-8">
      <div className="profile card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:p-10 ml-10 mr-10 md:ml-20 border border-gray-600 w-full lg:w-1/3   ">
        <ProfileCard />
      </div>
      <div className="Module card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:p-10 md:pb-20 ml-10 mr-10 md:ml-20 md:mr-20 border border-gray-600 w-full lg:w-2/3 block relative ">
        <div className="text-black text-3xl text-center mb-5 font-Poppins font-bold">
          Enrolled Course Modules
        </div>
        <div class="relative overflow-hidden shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-black">
            <thead class="text-lg  bg-gradient-to-l from-slate-500 to-slate-100 opacity-95">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Course Code
                </th>
                <th scope="col" class="px-6 py-3">
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
            </tbody>
          </table>
        </div>
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xl py-1 px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce absolute right-0 bottom-0 mr-3 mb-3 font-Poppins"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
