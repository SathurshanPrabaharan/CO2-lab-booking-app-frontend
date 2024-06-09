import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

type PC = {
  id: number;
  name: string;
  condition: string;
  software: string[];
};

const initialPCs: PC[] = [
  { id: 1, name: 'PC 1', condition: 'Good', software: ['Software A'] },
  { id: 2, name: 'PC 2', condition: 'Needs Maintenance', software: ['Software B'] },
  { id: 3, name: 'PC 3', condition: 'Good', software: ['Software C'] },
  // Add more PCs as needed
];

const Inventory: React.FC = () => {
  const [pcs, setPcs] = useState<PC[]>(initialPCs);
  const [selectedPc, setSelectedPc] = useState<PC | null>(null);
  const [filter, setFilter] = useState<{ condition: string; software: string }>({
    condition: '',
    software: '',
  });
  const [availableSoftware, setAvailableSoftware] = useState<string[]>([]);

  useEffect(() => {
    const softwareSet = new Set<string>();
    initialPCs.forEach((pc) => {
      pc.software.forEach((software) => softwareSet.add(software));
    });
    setAvailableSoftware(Array.from(softwareSet));
  }, []);

  const handlePcClick = (pc: PC) => {
    setSelectedPc(pc);
  };

  const closePcDetails = () => {
    setSelectedPc(null);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const filteredPcs = pcs.filter(
    (pc) =>
      (filter.condition === '' || pc.condition === filter.condition) &&
      (filter.software === '' || pc.software.includes(filter.software))
  );

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="PC Inventory" />

        <div className="mb-4 flex space-x-4">
          <select
            name="condition"
            value={filter.condition}
            onChange={handleFilterChange}
            className="px-4 py-2 rounded border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">All Conditions</option>
            <option value="Good">Good</option>
            <option value="Needs Maintenance">Needs Maintenance</option>
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
              onClick={() => handlePcClick(pc)}
            >
              <h3 className="font-medium text-black dark:text-white">{pc.name}</h3>
            </div>
          ))}
        </div>

        {selectedPc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 rounded border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <h3 className="font-medium text-black dark:text-white">PC Details</h3>
              <p className="text-black dark:text-white">Name: {selectedPc.name}</p>
              <p className="text-black dark:text-white">Condition: {selectedPc.condition}</p>
              <p className="text-black dark:text-white">Software: {selectedPc.software.join(', ')}</p>
              <button
                className="mt-4 px-4 py-2 rounded bg-primary text-white"
                onClick={closePcDetails}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Inventory;
