import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { FaCheck, FaChevronDown, FaChevronUp, FaTrash } from 'react-icons/fa';

type Lab = {
  id: number;
  name: string;
  description: string;
  requirementDescription: string;
  course: { name: string; code: string };
  date: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  status: string;
  accepted: boolean;
};

const Bookings: React.FC = () => {
  const [labs, setLabs] = useState<{ requests: Lab[]; overrides: Lab[] }>({
    requests: [],
    overrides: [],
  });

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
          status: lab.status,
        }));
        setLabs(prevLabs => ({
          ...prevLabs,
          requests: fetchedLabs,
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
      [type]: labs[type].filter(lab => lab.id !== id),
    });
  };

  const handleAccept = async (type: string, id: number) => {
    const labIndex = labs[type].findIndex(lab => lab.id === id);

    if (labIndex !== -1) {
      const updatedLabs = [...labs[type]];
      updatedLabs[labIndex] = { ...updatedLabs[labIndex], accepted: true };

      setLabs({
        ...labs,
        [type]: updatedLabs.filter(lab => lab.id !== id),
      });

      try {
        await axios.patch(`http://localhost:8087/api/v1/bookings/valid-bookings/${id}`, {
          bookingStatus: "APPROVED",
          rejectReason: null,
          updatedByAdminId: "578caa53-9b61-49f8-9328-a6afb48e5eb4",
        });
        console.log(`Accepted ${type} with id ${id}`);
      } catch (error) {
        console.error(`Error updating booking status for ${id}:`, error);
      }
    }
  };

  const handleReject = async (id: number, reason: string) => {
    const type = 'requests';
    const labIndex = labs[type].findIndex(lab => lab.id === id);

    if (labIndex !== -1) {
      const updatedLabs = [...labs[type]];
      updatedLabs.splice(labIndex, 1);

      setLabs({
        ...labs,
        [type]: updatedLabs,
      });

      try {
        await axios.patch(`http://localhost:8087/api/v1/bookings/valid-bookings/${id}`, {
          bookingStatus: "REJECTED",
          rejectReason: reason,
          updatedByAdminId: "578caa53-9b61-49f8-9328-a6afb48e5eb4",
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
               {lab.accepted ? 'Accepted' : 'Accept'}
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setRejectLabId(lab.id); 
                  setShowRejectPopup(true); 
                }} 
                className="bg-danger text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600"
              >
                 Reject
              </button>
            </div>
          </div>
        )}
      </div>
    ))
  );

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
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Bookings" />
        <div className="p-4 bg-gray-100 min-h-screen">
          {renderLabs('requests')}
          {showRejectPopup && (
            <RejectPopup 
              onClose={() => setShowRejectPopup(false)} 
              onReject={handleReject} 
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Bookings;
