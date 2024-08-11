import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ComputerGrid from '../Components/ComputerGrid'; // Import the ComputerGrid component

const SoftwareManagement: React.FC = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [computers, setComputers] = useState<Computer[]>([]);
  const [filteredComputers, setFilteredComputers] = useState<Computer[]>([]);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const [searchName, setSearchName] = useState('');
  const [searchVersion, setSearchVersion] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    fetchSoftwareList();
    fetchComputers();
  }, []);

  useEffect(() => {
    if (searchName || searchVersion) {
      fetchFilteredComputers();
    } else {
      setFilteredComputers(computers);
    }
  }, [searchName, searchVersion, computers]);

  const fetchSoftwareList = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/inventories/softwares?page=1&size=10');
      setSoftwareList(response.data.results || []);
    } catch (error) {
      console.error('Error fetching software list:', error);
    }
  };

  const fetchComputers = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/inventories?page=1&size=70'); // Fetch 70 computers
      setComputers(response.data.results || []);
      setFilteredComputers(response.data.results || []); // Initialize with all computers
    } catch (error) {
      console.error('Error fetching computers:', error);
    }
  };

  const fetchFilteredComputers = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/inventories?page=1&size=70&searchName=${searchName}&searchVersion=${searchVersion}`);
      setFilteredComputers(response.data.results || []);
    } catch (error) {
      console.error('Error fetching filtered computers:', error);
    }
  };

  const handleComputerClick = async (computer: Computer) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/inventories/softwares/${computer.id}`);
      setSelectedComputer(response.data || {});
      setDropdownOpen(dropdownOpen === computer.id ? null : computer.id); // Toggle dropdown
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching computer details:', error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedComputer(null);
    setDropdownOpen(null); // Close dropdown when dialog is closed
  };

  const handleCreateSoftware = async () => {
    const newSoftware = {
      name: "Java",
      version: "17",
      description: "This is a Programming language",
      category: "PROGRAMMING_LANG",
      createdBy: "72dcc33a-e38d-4aab-bfcf-3f7630f6a246"
    };

    try {
      await axios.post('http://localhost:8085/api/v1/inventories/softwares', newSoftware);
      fetchSoftwareList();
      handleDialogClose();
    } catch (error) {
      console.error('Error creating software:', error);
    }
  };

  const handleUpdateSoftware = async (softwareId: string) => {
    const updatedSoftware = {
      name: "Updated Name",
      version: "Updated Version",
      description: "Updated Description",
      category: "Updated Category",
      createdBy: "72dcc33a-e38d-4aab-bfcf-3f7630f6a246"
    };

    try {
      await axios.put(`http://localhost:8085/api/v1/inventories/softwares/${softwareId}`, updatedSoftware);
      fetchSoftwareList();
      handleDialogClose();
    } catch (error) {
      console.error('Error updating software:', error);
    }
  };

  const handleSearch = () => {
    fetchFilteredComputers();
  };

  // return (
  //   <div className="p-6">
  //     <div className="mb-4 space-x-5">
  //       <TextField
  //         label="Search by Software Name"
  //         value={searchName}
  //         onChange={(e) => setSearchName(e.target.value)}
  //         className="mr-4"
  //       />
  //       <TextField
  //         label="Search by Version"
  //         value={searchVersion}
  //         onChange={(e) => setSearchVersion(e.target.value)}
  //       />
  //       <Button variant="contained" onClick={handleSearch} className="ml-4">Search</Button>
  //     </div>

  //     <ComputerGrid
  //       inventory={filteredComputers}
  //       isSoftwareVersionInstalled={(pc) => softwareList.some(software => software.version === pc.componentCode)} // Example condition
  //       handleComputerClick={handleComputerClick}
  //     />

  //     {selectedComputer && (
  //       <Dialog open={dialogOpen} onClose={handleDialogClose}>
  //         <DialogTitle>Computer Details</DialogTitle>
  //         <DialogContent>
  //           <ul>
  //             {(selectedComputer.softwareList || []).map((software) => (
  //               <li key={software.id}>{software.name} - {software.version}</li>
  //             ))}
  //           </ul>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={handleCreateSoftware}>Add Software</Button>
  //           <Button onClick={() => handleUpdateSoftware(selectedComputer.id)}>Update Software</Button>
  //           <Button onClick={handleDialogClose}>Close</Button>
  //         </DialogActions>
  //       </Dialog>
  //     )}
  //   </div>
  // );
  interface Computer {
    id: string;
    name: string;
    status: string;
  }
  
  const computerList: Computer[] = Array.from({ length: 70 }, (_, index) => ({
    id: `pc-${index + 1}`,
    name: `Computer ${index + 1}`,
    status: index % 2 === 0 ? 'Available' : 'Not Available',
  }));
  return (
    <div className="container mx-auto bg-white p-4 relative rounded-lg">
      <h2 className="text-4xl font-bold mt-8 mb-4 text-black">Software Inventory</h2>
      <hr />
      <div className="grid grid-cols-6 gap-4 mb-8">
        {computerList.map((pc) => (
          <div
            key={pc.id}
            className={`p-4 rounded-md text-center shadow-lg ${
              pc.status === 'Available'
                ? 'bg-gradient-to-r from-green-400 to-gray-700 text-white'
                : 'bg-gradient-to-r from-blue-600 to-gray-700 text-white'
            }`}
          >
            {pc.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoftwareManagement;
