import React, { useState } from "react";
import ModuleDropdown from "./Dropdown";
import Footer from "../Components/Footer/Footer";

const Home: React.FC = () => {
  const [profileModules, setProfileModules] = useState<string[]>([]);
  const availableModules = ["Module 1", "Module 2", "Module 3", "Module 4"];

  const addModuleToProfile = (module: string) => {
    setProfileModules((prevModules) => [...prevModules, module]);
  };

  return (
    <div>
      <div className=" flex flex-wrap -mx-2 w-full lg:w-1/3 mb-4 p-5 position: relative">
        <div className="order 1 md: order 2 card bg-white bg-opacity-90 rounded-lg shadow-dark:bg-gray-800 dark:border-gray-700 md:px-10 py-20 border border-gray-600 md:w-full">
          <div className="card-body text-center">
            <div className="d-flex flex-col items-center shadow-md justify-self-center text-center">
              <img
                className=" w-28 md:w-40 mx-auto rounded-full p-1 bg-primary"
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt="Student"
              />
              <div className="mt-3">
                <h3 className="mb-2 text-black text-2xl font-semibold">Name</h3>
                <p className="text-black mb-2 text-2xl font-semibold">
                  202X/E/XXX
                </p>
                <p className="text-black mb-5 text-2xl font-semibold">
                  Department
                </p>
                <button className="absolute bottom-0 left-0 mb-4 ml-4 px-8 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition-all duration-500  focus:outline-none focus:ring focus:ring-blue-500 md:static">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/3 mb-4 p-5">
        <div className="card bg-white bg-opacity-90 rounded-2xl shadow-dark:bg-gray-800 dark:border-gray-700 md:px-10 py-20">
          <div className="card-body">
            <div className="row mb-3 flex">
              <div className="col-sm-3">
                <h6 className="mb-0 mx-10 text-x l text-black font-bold">
                  Full Name
                </h6>
              </div>
              <div className="col-sm-10 text-gray-500">
                <input
                  type="text"
                  className=" ml-4 form-control text-black bg-white border-gray-600"
                  value="John Doe"
                />
              </div>
            </div>
            <div className="row mb-3 flex">
              <div className="col-sm-3">
                <h6 className="mb-0 mx-10 text-xl">Department</h6>
              </div>
              <div className="col-sm-10 text-gray-500">
                <input
                  type="text"
                  className="form-control text-black bg-white border-gray-600"
                  value=""
                />
              </div>
            </div>
            <div className="row mb-3 flex">
              <div className="col-sm-3">
                <h6 className="mb-0 mx-10 text-xl">Semester</h6>
              </div>
              <div className="col-sm-9 text-gray-500">
                <input
                  type="text"
                  className="ml-6 form-control text-black bg-white border-gray-600"
                  value=""
                />
              </div>
            </div>
            <button className="absolute bottom-0 left-0 mb-4 ml-4  text-white bg-blue-500 rounded-md hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300 md:static">
              Update
            </button>
          </div>
        </div>
      </div>

      <nav className=" text-white p-10">
        <ul className="flex justify-around">
          <li>
            <h2 className="text-2xl">Name</h2>
          </li>
          <li>
            <h2 className="text-2xl">Index Number</h2>
          </li>
        </ul>
        <h2 className="text-2xl p-8">Department</h2>
      </nav>
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Add Course Module</h1>
        <ModuleDropdown
          modules={availableModules}
          addModule={addModuleToProfile}
        />
        <h2 className="text-xl font-bold mt-4">Profile Modules</h2>
        <ul className="list-disc pl-5">
          {profileModules.map((module, index) => (
            <li key={index} className="mt-2">
              {module}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
