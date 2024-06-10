import React, { useState } from "react";
import ModuleDropdown from "./Dropdown";

const CourseUpdate: React.FC = () => {
  const [profileModules, setProfileModules] = useState<
    { code: string; name: string }[]
  >([]);
  const availableModules = [
    { code: "EC6060", name: "Module 1" },
    { code: "EC6061", name: "Module 2" },
    { code: "EC6070", name: "Module 3" },
    { code: "EC6080", name: "Module 4" },
    { code: "EC6090", name: "Module 5" },
    { code: "EC6100", name: "Module 6" },
  ];

  const addModuleToProfile = (module: { code: string; name: string }) => {
    setProfileModules((prevModules) => [...prevModules, module]);
  };

  const removeModule = (moduleCode: string) => {
    setProfileModules((prevModules) =>
      prevModules.filter((module) => module.code !== moduleCode)
    );
  };
  return (
    <div className="flex mx-auto gap-2">
      <div className="Module card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700 md:px-10 py-20 ml-10 mr-10 md:ml-20 md:mr-20 border border-gray-600 w-full lg:w-1/2">
        <div className="card-body font-Poppins font-bold">
          <main className="p-4">
            <h1 className="text-3xl font-bold mb-4">Add Course Module</h1>
            <ModuleDropdown
              modules={availableModules}
              addModule={addModuleToProfile}
            />
          </main>
        </div>
      </div>
      <div className="Module card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700  border border-gray-600 mr-10 w-full lg:w-1/2">
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
              {profileModules.map((module, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-slate-200 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap"
                  >
                    {module.code}
                  </th>
                  <td className="px-6 py-4">{module.name}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removeModule(module.code)}
                      className="px-2 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CourseUpdate;
