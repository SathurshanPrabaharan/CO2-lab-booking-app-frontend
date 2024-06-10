import React from "react";
import { useNavigate } from "react-router-dom";
const handleClick = () => {
  const navigate = useNavigate();
  navigate("ProfileUpdate");
};
const ProfileCard: React.FC = () => {
  return (
    <div className="card body text-center text-bold text-3xl font-Poppins relative">
      <img
        className=" w-28 md:w-40 mx-auto rounded-full p-1 bg-primary opacity-100 border-4 border-white"
        src="src/assets/images/profile-avatar.png"
        alt="Student"
      />
      <div className="mt-3">
        <h3 className="mb-2 text-black text-2xl font-semibold">Name</h3>
        <p className="text-black mb-2 text-2xl font-semibold">202X/E/XXX</p>
        <p className="text-black mb-5 text-2xl font-semibold">Department</p>
        <div className="px-10 pt-8 pb-2">
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xl py-1 px-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce absolute right-0 bottom-0"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
