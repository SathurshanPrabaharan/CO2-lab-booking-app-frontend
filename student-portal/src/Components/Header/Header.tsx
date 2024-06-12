import React, { useState } from "react";
import UoJ_logo from "./UoJ_logo.png";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const Links = [
    { name: "Home", link: "/" },
    { name: "Profile", link: "/ProfileUpdate" },
    { name: "Schedule", link: "/Calendar" },
    { name: "Inventory", link: "/Inventory" },
  ];

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-1">
        <div className="flex items-center gap-5">
          <img
            className="w-20 ml-2 md:w-28 md:left-0 p-1 opacity-90"
            src={UoJ_logo}
            alt="Logo"
          />
          <div className="font-bold font-Poppins text-lg md:text-2xl">
            Welcome to Computer Lab 2 Booking System
          </div>
        </div>
        <div className="hidden md:flex space-x-5 lg:space-x-7 md:mr-1 lg:mr-3">
          {Links.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className="text-xl hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-400"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          {Links.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className="block px-4 py-2 text-xl text-white hover:bg-gray-600"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
