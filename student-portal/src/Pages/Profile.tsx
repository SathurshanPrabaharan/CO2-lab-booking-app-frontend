import React from "react";
import ProfileCard from "../Components/ProfileCard";

const Profile: React.FC = () => {
  return (
    <div className="flex mx-auto gap-8">
      <div className="profile card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:px-10 py-20 ml-10 mr-10 md:ml-20 border border-gray-600 w-full lg:w-1/3   ">
        <ProfileCard />
      </div>
      <div className="Module card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:px-10 py-20 ml-10 mr-10 md:ml-20 md:mr-20 border border-gray-600 w-full lg:w-2/3 block ">
        <div className="card-body font-Poppins font-bold relative">
          <button className="absolute bottom-0 left-0 mb-4 ml-4  text-white bg-blue-500 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 md:static">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
