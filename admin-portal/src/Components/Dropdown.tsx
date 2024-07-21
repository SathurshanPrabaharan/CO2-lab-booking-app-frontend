// src/components/Dropdown.js
import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

const Dropdown = ({ options, onAccept, onDelete }) => {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <div className='text-black'>{option.name}</div>
          <div className="flex space-x-4">
            <button onClick={() => onAccept(option.id)} className="text-green-500">
              <FaCheck className="text-xl" />
            </button>
            <button onClick={() => onDelete(option.id)} className="text-red-500">
              <FaTrash className="text-xl" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
