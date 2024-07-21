import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import ProfileUpdate from "../Pages/ProfileUpdate";
import CourseUpdate from "../Pages/CourseUpdate";
import Calendar from "../Components/Calendar";
import Inventory from "../Pages/Inventory";

const Routers = () => {
  return (
    <>
      <Routes>
        {<Route path="/" element={<Home />} />}
        <Route path="/Profile" element={<Profile />} />
        {<Route path="/ProfileUpdate" element={<ProfileUpdate />} />}
        <Route path="/Course_Update" element={<CourseUpdate />} />
        {<Route path="/Calendar" element={<Calendar />} />}
        <Route path="/Inventory" element={<Inventory />} />
      </Routes>
    </>
  );
};

export default Routers;
