import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex mx-auto gap-8">
      <div className="profile card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:px-10 py-20 ml-10 mr-10 md:ml-20 border border-gray-600 w-full lg:w-1/3  ">
        <div className="card body text-center text-bold text-3xl font-Poppins">
          <img
            className=" w-28 md:w-40 mx-auto rounded-full p-1 bg-primary opacity-100"
            src="src/assets/images/profile-avatar.png"
            alt="Student"
          />
          <div className="mt-3">
            <h3 className="mb-2 text-black text-2xl font-semibold">Name</h3>
            <p className="text-black mb-2 text-2xl font-semibold">202X/E/XXX</p>
            <p className="text-black mb-5 text-2xl font-semibold">Department</p>
            <button
              class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold text-2xl py-1 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce
              absolute bottom-0 right-0 mb-10 mr-20"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      <div className="Module card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:px-10 py-20 ml-10 mr-10 md:ml-20 md:mr-20 border border-gray-600 w-full lg:w-2/3 h-auto block "></div>
    </div>
  );
};

export default Profile;
