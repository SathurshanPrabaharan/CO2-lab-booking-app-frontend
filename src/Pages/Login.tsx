import comLab from "../assets/images/com-lab.jpg";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const login = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" bg-slate-800 border border-slate-400 rounded-xl p-10 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative ring ring-blue-100 ring-opacity-10 ring-offset-2">
          <h2 className=" text-3xl text-white font-bold text-center mb-6">
            Login
          </h2>
          <form action="">
            <div className="my-4">
              <label htmlFor="email" className="block text-left mb-2 text-xl">
                Email
              </label>
              <input
                type="email"
                className="block w-80 bg-white text-black text-lg font-bold rounded-full h-[42px] focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center"
              />
              <FaUser className=" text-black " />
            </div>
            <div>
              <label htmlFor="email" className="block text-left mb-2 text-xl">
                Password
              </label>
              <input
                type="password"
                className="block w-80 bg-white text-black text-lg font-bold rounded-full h-[42px] focus:bg-slate-200 border-blue-300 focus:outline-none focus:text-slate-950 text-center"
              />
              <FaLock className="  text-black" />
            </div>
           
            <div className="mt-3 flex items-center pl-2">
              <input type="checkbox" className="transform scale-150" name="" id="checkbox" />
              <label htmlFor="checkbox" className="ml-2"> Remember Me</label>
            </div>

            <button
              className="w-full mb-4 text-[18px] mt-10 rounded-full bg-emerald-600 text-white  hover:text-white  py-2  duration-100 border-none transform transition-transform hover:scale-110 active:outline-none active:border-none outline-none"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
