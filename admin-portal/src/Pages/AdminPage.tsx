import React, { useState } from 'react';
import { FaUserCog, FaSearch, FaEllipsisV, FaPlus, FaTrash } from 'react-icons/fa';
import InventoryPage from './InventoryPage'; // Import the InventoryPage component
import DashboardPage from './Dashboard';

const Admin = () => {
  const [labs, setLabs] = useState({
    requests: [{ id: 1, name: 'Lab A' }, { id: 2, name: 'Lab B' }],
    overrides: [{ id: 3, name: 'Lab Y' }, { id: 4, name: 'Lab Z' }]
  });

  const [activePage, setActivePage] = useState('Home');
  const [newLabName, setNewLabName] = useState('');
  const [labType, setLabType] = useState('requests');

  const handleDelete = (type, id) => {
    setLabs({
      ...labs,
      [type]: labs[type].filter(lab => lab.id !== id)
    });
  };

  const handleAddLab = () => {
    if (newLabName.trim() === '') return;

    const newLab = {
      id: Date.now(), // Unique ID for the new lab
      name: newLabName
    };

    setLabs({
      ...labs,
      [labType]: [...labs[labType], newLab]
    });

    setNewLabName(''); // Clear the input field after adding
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-black">Requests</h3>
            <div className="space-y-4">
              {labs.requests.map(lab => (
                <div key={lab.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                  <div className='text-black'>{lab.name}</div>
                  <div className="flex space-x-4">
                    <FaEllipsisV className="text-xl cursor-pointer" />
                    <button onClick={() => handleDelete('requests', lab.id)} className="text-red-500">
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black mt-8">Overrides</h3>
            <div className="space-y-4">
              {labs.overrides.map(lab => (
                <div key={lab.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                  <div className='text-black'>{lab.name}</div>
                  <div className="flex space-x-4">
                    <FaEllipsisV className="text-xl cursor-pointer" />
                    <button onClick={() => handleDelete('overrides', lab.id)} className="text-red-500">
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <select
                value={labType}
                onChange={(e) => setLabType(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none"
              >
                <option value="requests">Requests</option>
                <option value="overrides">Overrides</option>
              </select>
              <input
                type="text"
                value={newLabName}
                onChange={(e) => setNewLabName(e.target.value)}
                placeholder="New Lab Name"
                className="px-4 py-2 rounded-lg border focus:outline-none"
              />
              <button onClick={handleAddLab} className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-emerald-700">
                <FaPlus className="text-xl" />
              </button>
            </div>
          </div>
        );
      case 'Dashboard':
        return <DashboardPage />; // Render the Dashboard component
      case 'Inventory':
        return <InventoryPage />; // Render the InventoryPage component
      case 'Settings':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-black">Settings</h3>
            {/* Settings content goes here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-slate-800 w-1/4 min-h-full flex flex-col">
        <div className="p-4 text-white text-2xl font-bold">Admin Home Page</div>
        <nav className="flex flex-col space-y-2 p-4">
          <button onClick={() => setActivePage('Home')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Home' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Home</button>
          <button onClick={() => setActivePage('Dashboard')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Dashboard' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Dashboard</button>
          <button onClick={() => setActivePage('Inventory')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Inventory' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Inventory</button>
          <button onClick={() => setActivePage('Settings')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Settings' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Settings</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold text-black">Welcome message!</div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-full border focus:outline-none"
            />
            <FaSearch className="text-xl text-cyan-800" />
            <FaUserCog className="text-xl text-yellow-600" />
          </div>
        </div>

        {/* Render the appropriate content based on the active page */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
