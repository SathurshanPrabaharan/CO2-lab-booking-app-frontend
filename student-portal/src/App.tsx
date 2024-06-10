import React from "react";
import Header from "./Components/Header/Header";
import Profile from "./Pages/Profile";
import CourseUpdate from "./Pages/CourseUpdate";
import ProfileUpdate from "./Pages/ProfileUpdate";

function App() {
  return (
    <div className="bg-gradient-to-br  from-gray-900 to-gray-400 opacity-95 w-full relative overflow-hidden block">
      <img
        src="src/assets/images/com-lab-3.jpeg"
        className="w-full h-screen object-cover absolute mix-blend-overlay"
      />
      <Header />
      <div className="text-white text-bold text-4xl pt-5 mt-10 ml-10 md:ml-20 mb-20 ">
        Hello 202X/E/XXX
      </div>
      <CourseUpdate />
    </div>
  );
}

export default App;
