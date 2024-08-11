import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';

type PC = {
  id: string;
  name: string;
  status: string;
  software: string[];
};

type ApiResponse = {
  message: string;
  data: {
    total: number;
    results: {
      id: string;
      name: string;
      status: string;
    }[];
  };
};

type PCDetail = {
  id: string;
  name: string;
  serialNum: string | null;
  manufacturer: string | null;
  model: string | null;
  processor: string | null;
  memoryType: string | null;
  memorySize: string | null;
  storageType: string | null;
  storageSize: string | null;
  operatingSystem: string | null;
  purchaseDate: string | null;
  purchaseCost: string | null;
  warrantyExpiry: string | null;
  shortNote: string | null;
  lastMaintenanceDate: string | null;
  nextMaintenanceDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: string;
  installedSoftwares: string[];
};

const Inventory: React.FC = () => {
  const [pcs, setPcs] = useState<PC[]>([]);
  const [selectedPc, setSelectedPc] = useState<PCDetail | null>(null);
  const [filter, setFilter] = useState<{ status: string; software: string }>({
    status: '',
    software: '',
  });
  const [availableSoftware, setAvailableSoftware] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchPcs = async () => {
      try {
        const response = await axios.get<ApiResponse>('http://localhost:8085/api/v1/inventories?status=ACTIVE&page=1&size=999');
        const pcsFromApi = response.data.data.results.map((item) => ({
          id: item.id,
          name: item.name,
          status: item.status,
          software: [],
        })).sort((a, b) => a.name.localeCompare(b.name));
        setPcs(pcsFromApi);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch inventory data');
        setLoading(false);
      }
    };

    fetchPcs();
  }, []);

  useEffect(() => {
    const softwareSet = new Set<string>();
    pcs.forEach((pc) => {
      pc.software.forEach((software) => softwareSet.add(software));
    });
    setAvailableSoftware(Array.from(softwareSet));
  }, [pcs]);

  const handlePcClick = async (pcId: string) => {
    setLoadingDetails(true);
    try {
      const response = await axios.get<{ message: string; data: PCDetail }>(`http://localhost:8085/api/v1/inventories/${pcId}`);
      setSelectedPc(response.data.data);
    } catch (err) {
      setError('Failed to fetch PC details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const closePcDetails = () => {
    setSelectedPc(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleEditClick = (id: string) => {
    navigate(`/inventory/edit/${id}`); // Pass the ID in the URL
  };

  const filteredPcs = pcs.filter(
    (pc) =>
      (filter.status === '' || pc.status === filter.status) &&
      (filter.software === '' || pc.software.includes(filter.software))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="PC Inventory" />

        <div className="mb-4 flex space-x-4">
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
          <select
            name="software"
            value={filter.software}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">All Software</option>
            {availableSoftware.map((software) => (
              <option key={software} value={software}>
                {software}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPcs.map((pc) => (
            <div
              key={pc.id}
              className="p-4 rounded border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer"
              onClick={() => handlePcClick(pc.id)}
            >
              <h3 className="font-medium text-black dark:text-white">{pc.name}</h3>
            </div>
          ))}
        </div>

        {selectedPc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 rounded border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="text-black dark:text-white font-bold marker pb-4">PC Details</h3>
              {loadingDetails ? (
                <div>Loading...</div>
              ) : (
                <>
                  <p className="text-black dark:text-white">Name: {selectedPc.name}</p>
                  <p className="text-black dark:text-white">Status: {selectedPc.status}</p>
                  <p className="text-black dark:text-white">Serial Number: {selectedPc.serialNum}</p>
                  <p className="text-black dark:text-white">Manufacturer: {selectedPc.manufacturer}</p>
                  <p className="text-black dark:text-white">Model: {selectedPc.model}</p>
                  <p className="text-black dark:text-white">Processor: {selectedPc.processor}</p>
                  <p className="text-black dark:text-white">Memory Type: {selectedPc.memoryType}</p>
                  <p className="text-black dark:text-white">Memory Size: {selectedPc.memorySize}</p>
                  <p className="text-black dark:text-white">Storage Type: {selectedPc.storageType}</p>
                  <p className="text-black dark:text-white">Storage Size: {selectedPc.storageSize}</p>
                  <p className="text-black dark:text-white">Operating System: {selectedPc.operatingSystem}</p>
                  <p className="text-black dark:text-white">Purchase Date: {selectedPc.purchaseDate}</p>
                  <p className="text-black dark:text-white">Purchase Cost: {selectedPc.purchaseCost}</p>
                  <p className="text-black dark:text-white">Warranty Expiry: {selectedPc.warrantyExpiry}</p>
                  <p className="text-black dark:text-white">Short Note: {selectedPc.shortNote}</p>
                  <p className="text-black dark:text-white">Last Maintenance Date: {selectedPc.lastMaintenanceDate}</p>
                  <p className="text-black dark:text-white">Next Maintenance Date: {selectedPc.nextMaintenanceDate}</p>
                  <p className="text-black dark:text-white">Installed Softwares: {selectedPc.installedSoftwares.join(', ')}</p>
                  <button
                    className="mt-4 px-4 py-2 rounded bg-primary text-white"
                    onClick={() => handleEditClick(selectedPc.id)} // Pass the selected PC's ID
                  >
                    Edit
                  </button>
                  <button
                    className="mt-4 ml-4 px-4 py-2 rounded bg-danger text-white"
                    onClick={closePcDetails}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Inventory;
