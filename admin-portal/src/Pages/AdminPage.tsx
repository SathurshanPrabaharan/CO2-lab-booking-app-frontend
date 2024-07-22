import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCog, FaSearch, FaPlus, FaTrash, FaChevronDown, FaChevronUp, FaCheck } from 'react-icons/fa';
import InventoryPage from './InventoryPage';
import DashboardPage from './Dashboard';
import Setting from './Setting';
import StudentPage from './StudenrPage';
import StaffPage from './StaffPage';
import Course from './Course';
import Department from './Department';
import Profession from './Profession';

const Admin: React.FC = () => {
  const [labs, setLabs] = useState({
    requests: [],
    overrides: []
  });

  const [activePage, setActivePage] = useState('Home');
  const [newLabName, setNewLabName] = useState('');
  const [labType, setLabType] = useState('requests');
  const [showDescription, setShowDescription] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectPopup, setShowRejectPopup] = useState<boolean | { type: string; id: number }>(false);
  const [rejectLabId, setRejectLabId] = useState<number | null>(null);

  // Fetch lab requests from the backend API
  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:8087/api/v1/bookings/valid-bookings?bookingStatus=PENDING&page=1&size=10');
        const fetchedLabs = response.data.data.results.map((lab: any) => ({
          id: lab.id,
          name: lab.title,
          description: lab.description,
          requirementDescription: lab.requirementDescription,
          accepted: false,
          course: lab.course,
          date: lab.date,
          startTime: lab.startTime,
          endTime: lab.endTime,
          bookingStatus: lab.bookingStatus,
          status: lab.status
        }));
        setLabs(prevLabs => ({
          ...prevLabs,
          requests: fetchedLabs
        }));
      } catch (error) {
        console.error('Error fetching lab requests:', error);
      }
    };

    fetchLabs();
  }, []);

  const handleDelete = (type: string, id: number) => {
    setLabs({
      ...labs,
      [type]: labs[type].filter((lab: any) => lab.id !== id)
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

  const handleAccept = async (type: string, id: string) => {
    const labIndex = labs[type].findIndex((lab: any) => lab.id === id);

    if (labIndex !== -1) {
      const updatedLabs = [...labs[type]];
      updatedLabs[labIndex] = { ...updatedLabs[labIndex], accepted: true };

      setLabs({
        ...labs,
        [type]: updatedLabs.filter((lab: any) => lab.id !== id) // Remove the lab from the list after accepting
      });

      try {
        await axios.patch(`http://localhost:8087/api/v1/bookings/valid-bookings/${id}`, {
          bookingStatus: "APPROVED",
          rejectReason: null,
          updatedByAdminId: "9ff82bec-c216-4793-b2b2-6de18041c7e0"
        });
        console.log(`Accepted ${type} with id ${id}`);
      } catch (error) {
        console.error(`Error updating booking status for ${id}:`, error);
      }
    }
  };

  const handleReject = async (id: number, reason: string) => {
    const type = 'requests'; // or 'overrides' depending on your use case
    const labIndex = labs[type].findIndex((lab: any) => lab.id === id);

    if (labIndex !== -1) {
      const updatedLabs = [...labs[type]];
      updatedLabs.splice(labIndex, 1); // Remove the rejected lab

      setLabs({
        ...labs,
        [type]: updatedLabs
      });

      try {
        await axios.patch(`http://localhost:8087/api/v1/bookings/valid-bookings/${id}`, {
          bookingStatus: "REJECTED",
          rejectReason: reason,
          updatedByAdminId: "9ff82bec-c216-4793-b2b2-6de18041c7e0"
        });
        console.log(`Rejected ${type} with id ${id}`);
      } catch (error) {
        console.error(`Error updating booking status for ${id}:`, error);
      }
    }
  };

  const toggleDescription = (id: number) => {
    setShowDescription(showDescription === id ? null : id);
  };

  const renderLabs = (type: 'requests' | 'overrides') => (
    labs[type].map((lab: any) => (
      <div key={lab.id} className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center" onClick={() => toggleDescription(lab.id)}>
          <div className='text-black'>{lab.name}</div>
          <div className="flex space-x-4">
            {showDescription === lab.id ? <FaChevronUp className="text-xl cursor-pointer" /> : <FaChevronDown className="text-xl cursor-pointer" />}
          </div>
        </div>
        {showDescription === lab.id && (
          <div className="mt-2 text-gray-700">
            <p>{lab.description}</p>
            <p><strong>Requirement:</strong> {lab.requirementDescription}</p>
            <p><strong>Course:</strong> {lab.course.name} ({lab.course.code})</p>
            <p><strong>Date:</strong> {lab.date}</p>
            <p><strong>Time:</strong> {lab.startTime} - {lab.endTime}</p>
            <div className="mt-2 flex space-x-2">
              <button 
                onClick={() => handleAccept(type, lab.id)} 
                className={`bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 ${lab.accepted ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={lab.accepted}
              >
                <FaCheck className="text-xl" /> {lab.accepted ? 'Accepted' : 'Accept'}
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setRejectLabId(lab.id); 
                  setShowRejectPopup(true); 
                }} 
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
        return <StaffPage />;
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

  const RejectPopup: React.FC<{ onClose: () => void; onReject: (id: number, reason: string) => void }> = ({ onClose, onReject }) => {
    const handleReject = () => {
      if (rejectLabId !== null && rejectReason.trim()) {
        onReject(rejectLabId, rejectReason);
        setRejectReason('');
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h4 className="text-xl font-bold mb-4">Reject Lab Request</h4>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Enter rejection reason"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <div className="flex space-x-4 mt-4">
            <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-lg">Reject</button>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li onClick={() => setActivePage('Home')} className={`cursor-pointer py-2 px-4 ${activePage === 'Home' ? 'bg-gray-600' : ''}`}>Home</li>
          <li onClick={() => setActivePage('Dashboard')} className={`cursor-pointer py-2 px-4 ${activePage === 'Dashboard' ? 'bg-gray-600' : ''}`}>Dashboard</li>
          <li onClick={() => setActivePage('Inventory')} className={`cursor-pointer py-2 px-4 ${activePage === 'Inventory' ? 'bg-gray-600' : ''}`}>Inventory</li>
          <li onClick={() => setActivePage('Settings')} className={`cursor-pointer py-2 px-4 ${activePage === 'Settings' ? 'bg-gray-600' : ''}`}>Settings</li>
          <li onClick={() => setActivePage('Staff_management')} className={`cursor-pointer py-2 px-4 ${activePage === 'Staff_management' ? 'bg-gray-600' : ''}`}>Staff Management</li>
          <li onClick={() => setActivePage('student_management')} className={`cursor-pointer py-2 px-4 ${activePage === 'student_management' ? 'bg-gray-600' : ''}`}>Student Management</li>
          <li onClick={() => setActivePage('Course')} className={`cursor-pointer py-2 px-4 ${activePage === 'Course' ? 'bg-gray-600' : ''}`}>Course</li>
          <li onClick={() => setActivePage('Department')} className={`cursor-pointer py-2 px-4 ${activePage === 'Department' ? 'bg-gray-600' : ''}`}>Department</li>
          <li onClick={() => setActivePage('Profession')} className={`cursor-pointer py-2 px-4 ${activePage === 'Profession' ? 'bg-gray-600' : ''}`}>Profession</li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100">
        {renderContent()}
        {showRejectPopup && (
          <RejectPopup 
            onClose={() => setShowRejectPopup(false)} 
            onReject={handleReject} 
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
