import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import InventoryPage from '../Pages/InventoryPage';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import AdminPage from '../Pages/AdminPage';
import DashboardPage from '../Pages/Dashboard'; // Import DashboardPage if it exists
import DepartmentPage from '../Pages/Department';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Inventory_page" element={<InventoryPage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Admin_page" element={<AdminPage />} />
      <Route path="/Dashboard" element={<DashboardPage />} />
      <Route path="/Department" element={<DepartmentPage />} />
      <Route path="/Admin_page" element={<AdminPage />} />
       {/* Ensure this route exists if Dashboard is used */}
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default Routers;
