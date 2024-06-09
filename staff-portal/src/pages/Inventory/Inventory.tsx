import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

type PC = {
  id: number;
  name: string;
  condition: string;
};

const initialPCs: PC[] = [
  { id: 1, name: 'PC 1', condition: 'Good' },
  { id: 2, name: 'PC 2', condition: 'Needs Maintenance' },
  { id: 3, name: 'PC 3', condition: 'Good' },
  // Add more PCs as needed
];

const Inventory: React.FC = () => {
  const [pcs, setPcs] = useState<PC[]>(initialPCs);
  const [selectedPc, setSelectedPc] = useState<PC | null>(null);

  const handlePcClick = (pc: PC) => {
    setSelectedPc(pc);
  };

  const closePcDetails = () => {
    setSelectedPc(null);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="PC Inventory" />

        <div className="grid grid-cols-1 gap-4">
          {pcs.map((pc) => (
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
