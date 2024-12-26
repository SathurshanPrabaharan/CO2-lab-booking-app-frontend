import React from 'react';

interface Computer {
  id: string;
  componentCode: string;
  // Add other properties as needed
}

interface Props {
  inventory: Computer[];
  isSoftwareVersionInstalled: (pc: Computer) => boolean;
  handleComputerClick: (pc: Computer) => void;
}

const ComputerGrid: React.FC<Props> = ({ inventory, isSoftwareVersionInstalled, handleComputerClick }) => {
  return (
    <div className="grid grid-cols-6 rounded-md gap-4 mb-8">
      {inventory.map((pc) => (
        <div
          key={pc.id}
          className={`p-4 rounded-md text-center cursor-pointer shadow-lg ${
            isSoftwareVersionInstalled(pc)
              ? 'bg-gradient-to-r from-green-400 to-gray-700 text-white'
              : 'bg-gradient-to-r from-blue-600 to-gray-700 text-white'
          }`}
          onClick={() => handleComputerClick(pc)}
        >
          <div className="text-lg font-semibold">{pc.componentCode}</div>
        </div>
      ))}
    </div>
  );
};

export default ComputerGrid;
