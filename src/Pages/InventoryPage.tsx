import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  isBooked: boolean;
  department: string; // Added department field
}

interface Software {
  name: string;
  versions: string[];
}

const departments = ['Computer Engineering', 'EE Engineering', 'Civil Engineering', 'Mechanical Engineering'];

const softwareList: Software[] = [
  { name: 'Software A', versions: ['1.0', '1.1', '2.0'] },
  { name: 'Software B', versions: ['3.0', '3.1'] },
  { name: 'Software C', versions: ['4.0', '4.1', '4.2'] },
];

const InventoryPage: React.FC = () => {
  // Sample inventory data with department and booking status
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Lab Equipment 1', quantity: 5, isBooked: false, department: 'Computer Engineering' },
    { id: 2, name: 'Lab Equipment 2', quantity: 10, isBooked: false, department: 'Civil Engineering' },
    { id: 3, name: 'Lab Equipment 3', quantity: 3, isBooked: false, department: 'EE Engineering' },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  // Function to add a new item to the inventory
  const addItem = () => {
    const newItem: InventoryItem = {
      id: inventory.length + 1,
      name: `New Equipment ${inventory.length + 1}`,
      quantity: 0,
      isBooked: false,
      department: 'Science', // Default department
    };
    setInventory([...inventory, newItem]);
  };

  // Function to toggle booking status of an item
  const toggleBooking = (id: number) => {
    setInventory(
      inventory.map(item =>
        item.id === id ? { ...item, isBooked: !item.isBooked } : item
      )
    );
  };

  // Function to handle department selection
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
  };

  // Function to handle software selection
  const handleSoftwareChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSoftware(e.target.value);
    setSelectedVersion(''); // Reset version when software changes
  };

  // Function to handle version selection
  const handleVersionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVersion(e.target.value);
  };

  // Filter inventory based on selected department
  const filteredInventory = selectedDepartment === 'All' 
    ? inventory 
    : inventory.filter(item => item.department === selectedDepartment);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-6">Lab Inventory</h1>
      <div className="mb-4">
        <label htmlFor="department" className="mr-2">Choose Department:</label>
        <select
          id="department"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="border border-gray-300 rounded p-2 mr-4"
        >
          <option value="All">All</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <label htmlFor="software" className="mr-2">Choose Software:</label>
        <select
          id="software"
          value={selectedSoftware}
          onChange={handleSoftwareChange}
          className="border border-gray-300 rounded p-2 mr-4"
        >
          <option value="">Select Software</option>
          {softwareList.map(software => (
            <option key={software.name} value={software.name}>{software.name}</option>
          ))}
        </select>

        <label htmlFor="version" className="mr-2">Choose Version:</label>
        <select
          id="version"
          value={selectedVersion}
          onChange={handleVersionChange}
          className="border border-gray-300 rounded p-2"
          disabled={!selectedSoftware}
        >
          <option value="">Select Version</option>
          {selectedSoftware && softwareList.find(software => software.name === selectedSoftware)?.versions.map(version => (
            <option key={version} value={version}>{version}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {filteredInventory.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-gray-500">Department: {item.department}</p>
            <button
              className={`${
                item.isBooked ? 'bg-red-500' : 'bg-blue-500'
              } text-white px-4 py-2 rounded-md mt-2`}
              onClick={() => toggleBooking(item.id)}
            >
              {item.isBooked ? 'Cancel Booking' : 'Book Item'}
            </button>
          </div>
        ))}
        <div
          className="bg-white rounded-lg p-4 shadow-md flex justify-center items-center cursor-pointer"
          onClick={addItem}
        >
          <FaPlus className="text-xl text-gray-500 mr-2" />
          <span className="text-gray-500">Add New Item</span>
        </div>
      </div>
      
      <h2 className="text-xl font-bold mt-8 mb-4">Computer Booking System</h2>
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 70 }, (_, i) => (
          <div
            key={i + 1}
            className={`p-4 rounded-md shadow-md text-center cursor-pointer ${
              inventory.some(item => item.id === i + 1 && item.isBooked)
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
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
