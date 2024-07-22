import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDialog from '../Components/CustomDialog'; // Import the custom dialog

interface Software {
  id: string;
  name: string;
  version: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string | null;
  status: string;
}

interface Computer {
  id: string;
  name: string;
  status: string;
  serialNum?: string;
  manufacturer?: string;
  model?: string;
  processor?: string;
  memoryType?: string;
  memorySize?: string;
  storageType?: string;
  storageSize?: string;
  operatingSystem?: string;
  purchaseDate?: string;
  purchaseCost?: string;
  warrantyExpiry?: string;
  shortNote?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
}

const InventoryPage: React.FC = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [computers, setComputers] = useState<{ id: string; software: string; version: string }[]>([]);
  const [inventory, setInventory] = useState<Computer[]>([]);
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/inventories?page=1&size=999');
        const { results } = response.data.data;
        const sortedResults = results.sort((a: Computer, b: Computer) => a.name.localeCompare(b.name));
        setInventory(sortedResults);
      } catch (error) {
        setError('Error fetching inventory data.');
      }
    };

    const fetchSoftwareList = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/inventories/softwares?page=1&size=999');
        const { results } = response.data.data;
        setSoftwareList(results);
      } catch (error) {
        setError('Error fetching software list.');
      }
    };

    fetchInventory();
    fetchSoftwareList();
  }, []);

  const handleSoftwareChange = (software: string) => {
    setSelectedSoftware(software);
    const selected = softwareList.filter((s) => s.name === software);
    const uniqueVersions = Array.from(new Set(selected.map((s) => s.version)));
    setVersions(uniqueVersions);
    setSelectedVersion('');
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
  };

  const isSoftwareVersionInstalled = (id: string) => {
    return computers.some(
      (computer) => computer.id === id && computer.software === selectedSoftware && computer.version === selectedVersion
    );
  };

  const handleComputerClick = (computer: Computer) => {
    setSelectedComputer(computer);
  };

  const saveToDatabase = async () => {
    if (!selectedSoftware || !selectedVersion) {
      setPopupMessage('Please select software and version.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:8085/api/v1/inventories', { computers });
      setPopupMessage('Data saved successfully!');
    } catch (error) {
      setError('Error saving data.');
    } finally {
      setLoading(false);
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
          onChange={(e) => handleSoftwareChange(e.target.value)}
          className="border border-gray-300 rounded p-1 mr-4 bg-slate-200 text-black"
          list="software-list"
        />
        <datalist id="software-list">
          {softwareList.map((software) => (
            <option key={software.id} value={software.name} />
          ))}
        </datalist>

        <label htmlFor="version" className="mr-2 text-black">Choose Version:</label>
        <input
          id="version"
          value={selectedVersion}
          onChange={(e) => handleVersionChange(e.target.value)}
          className="border border-gray-300 rounded p-1 bg-slate-200 text-black"
          disabled={!selectedSoftware}
          list="version-list"
        />
        <datalist id="version-list">
          {versions.map((version, index) => (
            <option key={index} value={version} />
          ))}
        </datalist>
      </div>
      <div className="grid grid-cols-6 rounded-md gap-4 mb-8">
        {inventory.map((pc) => (
          <div
            key={pc.id}
            className={`p-4 rounded-md text-center cursor-pointer shadow-lg ${
              isSoftwareVersionInstalled(pc.id)
                ? 'bg-gradient-to-r from-green-400 to-gray-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-gray-700 text-white'
            }`}
            onClick={() => handleComputerClick(pc)}
          >
            {pc.name}
            {isSoftwareVersionInstalled(pc.id) && (
              <span> - {selectedSoftware} {selectedVersion}</span>
            )}
          </div>
        ))}
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={saveToDatabase}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save to Database'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <CustomDialog
        open={!!selectedComputer}
        message={selectedComputer ? JSON.stringify(selectedComputer, null, 2) : ''}
        onClose={() => setSelectedComputer(null)}
      />
    </div>
  );
};

export default InventoryPage;
