// InventoryPage.tsx
import React, { useState } from 'react';
import axios from 'axios';
import CustomDialog from '../Components/CustomDialog'; // Import the custom dialog

interface Software {
  name: string;
  versions: string[];
}

const InventoryPage: React.FC = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [computers, setComputers] = useState<{ id: number; software: string; version: string }[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleSoftwareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSoftware(e.target.value);
    setSelectedVersion('');
  };

  const handleVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVersion(e.target.value);
  };

  const isSoftwareVersionInstalled = (id: number) => {
    return computers.some(
      (computer) => computer.id === id && computer.software === selectedSoftware && computer.version === selectedVersion
    );
  };

  const handleComputerClick = (id: number) => {
    setComputers((prev) => {
      const isSelected = prev.some(
        (computer) => computer.id === id && computer.software === selectedSoftware && computer.version === selectedVersion
      );

      if (isSelected) {
        return prev.filter((computer) => !(computer.id === id && computer.software === selectedSoftware && computer.version === selectedVersion));
      } else {
        return [
          ...prev,
          { id, software: selectedSoftware, version: selectedVersion },
        ];
      }
    });
  };

  const saveToDatabase = async () => {
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', { computers });
      setPopupMessage('Data saved successfully!');
    } catch (error) {
      setPopupMessage('Error saving data.');
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div className="container mx-auto bg-white p-4 relative rounded-lg">
      <h2 className="text-4xl font-bold mt-8 mb-4 text-black">Computer Booking System</h2>
      <hr />
      <div className="mb-4">
        <label htmlFor="software" className="mr-2 text-black">Choose Software:</label>
        <input
          id="software"
          value={selectedSoftware}
          onChange={handleSoftwareChange}
          className="border border-gray-300 rounded p-1 mr-4 bg-slate-200 text-black"
        />

        <label htmlFor="version" className="mr-2 text-black">Choose Version:</label>
        <input
          id="version"
          value={selectedVersion}
          onChange={handleVersionChange}
          className="border border-gray-300 rounded p-1 bg-slate-200 text-black"
          disabled={!selectedSoftware}
        />
      </div>
      <div className="grid grid-cols-6 rounded-md gap-4 mb-8">
        {Array.from({ length: 70 }, (_, i) => (
          <div
            key={i + 1}
            className={`p-4 rounded-md text-center cursor-pointer shadow-lg ${
              isSoftwareVersionInstalled(i + 1)
                ? 'bg-gradient-to-r from-green-400 to-gray-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-gray-700 text-white'
            }`}
            onClick={() => handleComputerClick(i + 1)}
          >
            Computer {i + 1}
            {isSoftwareVersionInstalled(i + 1) && (
              <span> - {selectedSoftware} {selectedVersion}</span>
            )}
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={saveToDatabase}
      >
        Save to Database
      </button>

      <CustomDialog
        open={popupMessage !== null}
        message={popupMessage || ''}
        onClose={closePopup}
      />
    </div>
  );
};

export default InventoryPage;
