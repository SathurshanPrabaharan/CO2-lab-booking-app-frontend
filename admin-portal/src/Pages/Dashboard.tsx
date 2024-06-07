import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardPage = () => {
  const data = {
    labels: ['Accepted', 'Rejected', 'Pending'],
    datasets: [
      {
        label: 'Requests Summary',
        data: [12, 5, 3], // Example data
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
        hoverBackgroundColor: ['#45A049', '#E53935', '#FFB300'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}

      {/* Calendar and Details Section */}
      <div className="flex flex-1">
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-black">Date: 1</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <span className="text-black">Lab X</span>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash className="text-xl" />
              </button>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
              <span className="text-black">Lab Y</span>
              <button className="text-red-500 hover:text-red-700">
                <FaTrash className="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/4 pl-6">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-bold mb-2 text-black">Summary</h3>
            <div className="relative w-full h-64">
              <Pie data={data} options={options} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-black">Description</h3>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              rows={5}
              placeholder="Description..."
            ></textarea>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg mt-2 hover:bg-emerald-700 transition duration-300">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
