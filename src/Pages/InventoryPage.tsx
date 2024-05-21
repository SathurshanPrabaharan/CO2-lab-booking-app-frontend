import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  isBooked: boolean;
  department: string;
}

interface Software {
  name: string;
  versions: string[];
}

const softwareList: Software[] = [
  { name: 'Software A', versions: ['1.0', '1.1', '2.0'] },
  { name: 'Software B', versions: ['3.0', '3.1'] },
  { name: 'Software C', versions: ['4.0', '4.1', '4.2'] },
];

const InventoryPage: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Lab Equipment 1', quantity: 5, isBooked: false, department: 'Computer Engineering' },
    { id: 2, name: 'Lab Equipment 2', quantity: 10, isBooked: false, department: 'Civil Engineering' },
    { id: 3, name: 'Lab Equipment 3', quantity: 3, isBooked: false, department: 'EE Engineering' },
  ]);
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  const addItem = () => {
    const newItem: InventoryItem = {
      id: inventory.length + 1,
      name: `New Equipment ${inventory.length + 1}`,
      quantity: 0,
      isBooked: false,
      department: 'Computer Engineering',
    };
    setInventory([...inventory, newItem]);
  };

  const toggleBooking = (id: number) => {
    setInventory(
      inventory.map(item =>
        item.id === id ? { ...item, isBooked: !item.isBooked } : item
      )
    );
  };

  const handleSoftwareChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSoftware(e.target.value);
    setSelectedVersion('');
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(e.target.value);
  };

  return (
    <div className="container mx-auto bg-white p-4 relative rounded-lg">
      <div className="background">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="line line1"></div>
        <div className="line line2"></div>
      </div>
      <h1 className="text-4xl font-bold mt-4 mb-6 text-black">Lab Inventory</h1>
      <div className="mb-4">
        <label htmlFor="software" className="mr-2 text-black">Choose Software:</label>
        <select
          id="software"
          value={selectedSoftware}
          onChange={handleSoftwareChange}
          className="border border-gray-300 rounded p-2 mr-4 bg-slate-600"
        >
          <option value="">Select Software</option>
          {softwareList.map(software => (
            <option key={software.name} value={software.name}>{software.name}</option>
          ))}
        </select>

        <label htmlFor="version" className="mr-2 text-black">Choose Version:</label>
        <select
          id="version"
          value={selectedVersion}
          onChange={handleVersionChange}
          className="border border-gray-300 rounded p-2 bg-slate-600"
          disabled={!selectedSoftware}
        >
          <option value="">Select Version</option>
          {selectedSoftware && softwareList.find(software => software.name === selectedSoftware)?.versions.map(version => (
            <option key={version} value={version}>{version}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {inventory.map((item) => (
          <div key={item.id} className="bg-slate-100 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold  text-gray-600 ">{item.name}</h2>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">Department: {item.department}</p>
            <button
              className={`${
                item.isBooked ? 'bg-red-500' : 'bg-slate-500'
              } text-white px-4 py-2 rounded-md mt-2`}
              onClick={() => toggleBooking(item.id)}
            >
              {item.isBooked ? 'Cancel Booking' : 'Book Item'}
            </button>
          </div>
        ))}
        <div
          className="bg-gray-200 rounded-lg p-4 shadow-md flex justify-center items-center cursor-pointer"
          onClick={addItem}
        >
          <FaPlus className="text-xl text-gray-500 mr-2" />
          <span className="text-gray-500">Add New Item</span>
        </div>
      </div>
      
      <h2 className="text-4xl font-bold mt-8 mb-4 text-black">Computer Booking System</h2>
      <div className="grid grid-cols-6 rounded-md gap-4">
        {Array.from({ length: 70 }, (_, i) => (
          <div
            key={i + 1}
            className={`p-4 rounded-md text-center cursor-pointer shadow-lg  ${
              inventory.some(item => item.id === i + 1 && item.isBooked)
                ? 'bg-red-500 text-white'
                : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
            }`}
            onClick={() => toggleBooking(i + 1)}
          >
            Computer {i + 1}
            {inventory.some(item => item.id === i + 1 && item.isBooked) && (
              <span> - Booked</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
