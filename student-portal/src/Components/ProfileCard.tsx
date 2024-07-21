import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileCard: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("ProfileUpdate");
  };
  return (
    <div className="card body text-center text-bold text-2xl md:text-3xl font-Poppins relative">
      <img
        className=" w-28 md:w-40 mx-auto rounded-full p-1 bg-primary opacity-100 border-4 border-white"
        src="src/assets/images/profile-avatar.png"
        alt="Student"
      />
      <div className="mt-3">
        <h3 className="mb-1 text-black text-xl md:text-2xl font-semibold">
          Name
        </h3>
        <p className="text-black mb-1 text-xl md:text-2xl font-semibold">
          202X/E/XXX
        </p>
        <p className="text-black mb-5 text-xl md:text-2xl font-semibold">
          Department
        </p>
      </div>
    </div>
  );
};
export default ProfileCard;
