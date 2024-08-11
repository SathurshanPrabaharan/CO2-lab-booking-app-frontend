import React from 'react';

const ComputerIcon = ({ computer, onClick }) => {
  return (
    <div
      onClick={() => onClick(computer)}
      className="relative p-4 rounded-md text-center cursor-pointer shadow-lg bg-gradient-to-r from-blue-600 to-gray-700 text-white flex items-center justify-center"
    >
      <div className="text-lg font-semibold">{computer.name}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Placeholder icon; replace with actual icons or images */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-800">
          <span className="text-2xl">🖥️</span>
        </div>
      </div>
    </div>
  );
};

export default ComputerIcon;
