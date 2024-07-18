import React, { useState } from 'react';
import { FaUserCog, FaSearch, FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';
import InventoryPage from './InventoryPage'; // Import the InventoryPage component
import DashboardPage from './Dashboard'; // Import the Dashboard component
import Setting from './Setting';
import StudentPage from './StudenrPage';
import StaffPage from './StaffPage';
import Course from './Course';
import Department from './Department';
import Profession from './Profession';

const Admin: React.FC = () => {
  const [labs, setLabs] = useState({
    requests: [
      { id: 1, name: 'Lab A', description: 'Description for Lab A', accepted: false },
      { id: 2, name: 'Lab B', description: 'Description for Lab B', accepted: false }
    ],
    overrides: [
      { id: 3, name: 'Lab Y', description: 'Description for Lab Y', accepted: false },
      { id: 4, name: 'Lab Z', description: 'Description for Lab Z', accepted: false }
    ]
  });

  const [activePage, setActivePage] = useState('Home');
  const [newLabName, setNewLabName] = useState('');
  const [labType, setLabType] = useState('requests');
  const [showDescription, setShowDescription] = useState<number | null>(null); // State to manage the description visibility

  const handleDelete = (type: string, id: number) => {
    setLabs({
      ...labs,
      [type]: labs[type].filter(lab => lab.id !== id)
    });
  };

  const handleAddLab = () => {
    if (newLabName.trim() === '') return;

    const newLab = {
      id: Date.now(),
      name: newLabName,
      description: '',
      accepted: false
    };

    setLabs({
      ...labs,
      [labType]: [...labs[labType], newLab]
    });

    setNewLabName('');
  };

  const handleAccept = (type: string, id: number) => {
    const labIndex = labs[type].findIndex((lab) => lab.id === id);

    if (labIndex !== -1) {
      const updatedLabs = [...labs[type]];
      updatedLabs[labIndex] = { ...updatedLabs[labIndex], accepted: true };

      setLabs({
        ...labs,
        [type]: updatedLabs,
      });

      console.log(`Accepted ${type} with id ${id}`);
    }
  };

  const toggleDescription = (id: number) => {
    setShowDescription(showDescription === id ? null : id);
  };

  const renderLabs = (type: 'requests' | 'overrides') => (
    labs[type].map(lab => (
      <div key={lab.id} className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center" onClick={() => toggleDescription(lab.id)}>
          <div className='text-black'>{lab.name}</div>
          <div className="flex space-x-4">
            {showDescription === lab.id ? <FaChevronUp className="text-xl cursor-pointer" /> : <FaChevronDown className="text-xl cursor-pointer" />}
          </div>
        </div>
        {showDescription === lab.id && (
          <div className="mt-2 text-gray-700">
            {lab.description}
            <div className="mt-2 flex space-x-2">
              <button 
                onClick={() => handleAccept(type, lab.id)} 
                className={`bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 ${lab.accepted ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={lab.accepted}
              >
                <FaCheck className="text-xl" /> {lab.accepted ? 'Accepted' : 'Accept'}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(type, lab.id); }} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
              >
                <FaTrash className="text-xl" /> Reject
              </button>
            </div>
          </div>
        )}
      </div>
    ))
  );

  const renderContent = () => {
    switch (activePage) {
      case 'Home':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-black">Requests</h3>
            <div className="space-y-4">
              {renderLabs('requests')}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-black mt-8">Overrides</h3>
            <div className="space-y-4">
              {renderLabs('overrides')}
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
        return <DashboardPage />;
      case 'Inventory':
        return <InventoryPage />;
      case 'Settings':
        return <Setting />;
      case 'Staff_management':
        return <StaffPage/>;
      case 'student_management':
        return <StudentPage />;
      case 'Course':
        return <Course />;
      case 'Department':
       return <Department />;
      case 'Profession':
        return <Profession />;
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
          <button onClick={() => setActivePage('Staff_management')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Staff_management' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Staff Management</button>
          <button onClick={() => setActivePage('student_management')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'student_management' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Student Management</button>
          <button onClick={() => setActivePage('Course')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Course' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Course</button>
          <button onClick={() => setActivePage('Department')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Department' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Department</button>
          <button onClick={() => setActivePage('Profession')} className={`text-left px-4 py-2 rounded-lg ${activePage === 'Profession' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-black'}`}>Profession</button>
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
