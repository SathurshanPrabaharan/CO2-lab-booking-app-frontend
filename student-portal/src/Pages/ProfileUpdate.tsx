import { useState } from "react";
import Footer from "../Components/Footer/Footer";

const ProfileUpdate = () => {
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  return (
    <div className="bg-gradient-to-br  from-gray-900 to-gray-400 opacity-95 w-full relative overflow-hidden block">
      <img
        src="src/assets/images/com-lab-3.jpeg"
        className="w-full h-screen object-cover absolute mix-blend-overlay"
      />
      <div className="lg:flex mx-auto gap-8 mt-8">
        <div className="infoUpdate card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700  p-4 lg:p-10 ml-10 mr-10 lg:ml-3 lg:mr-20 border border-gray-600 w-80  block relative md:w-4/5 md:ml-20 lg:w-3/4 mt-16">
          <div className="card-body font-Poppins font-bold">
            <div className="border-b border-stroke py-4 px-7 ">
              <h3 className=" text-2xl text-black text-center">
                Personal Information
              </h3>
            </div>
            <div>
              <div className=" mb-5.5">
                <h6 className="mb-3 block text-xl font-medium text-black">
                  Full Name
                </h6>
              </div>
              <div className="col-sm-10 text-gray-500">
                <input
                  type="text"
                  className="w-full rounded border border-stroke bg-gray py-3 px-3 text-black focus:border-primary focus-visible:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="mb-5.5">
              <label
                className="mt-3 mb-3 block text-xl font-medium text-black"
                htmlFor="department"
              >
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none "
              >
                <option value="" disabled>
                  Select your department
                </option>
                <option value="Computing">Computing</option>
                <option value="EEE">EEE</option>
                <option value="Civil">Civil</option>
                <option value="Mechanical">Mechanical</option>
              </select>
            </div>
            <form action="#">
              <div className="mb-5.5">
                <label
                  className="mb-3 mt-3 block text-xl font-medium text-black"
                  htmlFor="course"
                >
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none"
                >
                  <option value="" disabled>
                    Select your Semester
                  </option>
                  <option value="Semester 1">Semester 1</option>
                  <option value="Semester 2">Semester 2</option>
                  <option value="Semester 3">Semester 3</option>
                  <option value="Semester 4">Semester 4</option>
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </select>
              </div>

              <div className="mt-16 flex justify-end gap-4.5">
                <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mr-4">
                  Cancel
                </button>
                <button className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="inforUpdate card bg-gradient-to-l from-slate-300 to-slate-100 opacity-95 rounded-lg shadow-lg dark:border-gray-700  p-4 lg:p-10 lg:pb-20 ml-10 mr-10 lg:ml-3 lg:mr-20 border border-gray-600 w-80  block relative md:w-4/5 md:ml-20 lg:w-3/4 mt-16">
          <div className="card-body font-Poppins font-bold">
            <div className="border-b border-stroke py-4 px-7 ">
              <h3 className="text-2xl text-center text-black">
                Upload Your Profile Picture
              </h3>
            </div>
            <div className="relative in-line">
              <img
                className=" w-28  md:w-40 mx-auto rounded-full p-1 bg-primary opacity-100 border-4 border-white"
                src="src/assets/images/profile-avatar.png"
                alt="Student"
              />

              <div className="mb-5 text-black text-xl text-center">
                Edit your photo
                <span className="flex md:gap-2.5 mt-5 justify-center">
                  <button className="cursor-pointer transition-all bg-blue-500 text-white px-4 md:px-6 py-1 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mr-2 text-lg">
                    Delete
                  </button>
                  <button className="cursor-pointer transition-all bg-blue-500 text-white px-4 md:px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-lg">
                    Update
                  </button>
                </span>
              </div>
              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                      />
                    </svg>
                  </span>
                  <span className="text-primary">Click to upload</span>
                </div>
              </div>

              <div className="flex md:gap-2.5 mt-5 justify-center">
                <button
                  className="cursor-pointer transition-all bg-blue-500 text-white px-4 md:px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] mr-2 text-lg"
                  type="submit"
                >
                  Cancel
                </button>
                <button className="cursor-pointer transition-all bg-blue-500 text-white px-4 md:px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-lg">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProfileUpdate;
