import React, { useState, useEffect } from "react";

type PC = {
  id: number;
  name: string;
  condition: string;
  software: string[];
  Version: string[];
};

const initialPCs: PC[] = [
  {
    id: 1,
    name: "PC 1",
    condition: "Good",
    software: ["Software A"],
    Version: ["1.1"],
  },
  {
    id: 2,
    name: "PC 2",
    condition: "Needs Maintenance",
    software: ["Software B"],
    Version: ["1.1"],
  },
  {
    id: 3,
    name: "PC 3",
    condition: "Good",
    software: ["Software C"],
    Version: ["1.1"],
  },
  {
    id: 4,
    name: "PC 4",
    condition: "Good",
    software: ["Software C, Software B"],
    Version: ["1.1, 1.2"],
  },
  {
    id: 5,
    name: "PC 5",
    condition: "Good",
    software: ["Software C, Software A"],
    Version: ["1.1, 1.3"],
  },
  {
    id: 6,
    name: "PC 6",
    condition: "Good",
    software: ["Software A, Software B, Software C"],
    Version: ["1.1, 1.2, 1.3"],
  },
  {
    id: 7,
    name: "PC 7",
    condition: "Good",
    software: ["Software A, Software B, Software C"],
    Version: ["1.1, 1.2, 1.3"],
  },
  // Add more PCs as needed
];

const Inventory: React.FC = () => {
  const [pcs, setPcs] = useState<PC[]>(initialPCs);
  const [selectedPc, setSelectedPc] = useState<PC | null>(null);
  const [filter, setFilter] = useState<{ condition: string; software: string }>(
    {
      condition: "",
      software: "",
    }
  );
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
      (filter.condition === "" || pc.condition === filter.condition) &&
      (filter.software === "" || pc.software.includes(filter.software))
  );

  return (
    <div className="mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className="mb-4 flex space-x-4">
        <select
          name="condition"
          value={filter.condition}
          onChange={handleFilterChange}
          className="px-4 py-2 rounded border border-stroke bg-white"
        >
          <option value="">All Conditions</option>
          <option value="Good">Good</option>
          <option value="Needs Maintenance">Needs Maintenance</option>
        </select>
        <select
          name="software"
          value={filter.software}
          onChange={handleFilterChange}
          className="px-2 lg:px-4 py-2 rounded border border-stroke bg-white"
        >
          <option value="">All Software</option>
          {availableSoftware.map((software) => (
            <option key={software} value={software}>
              {software}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-4xl font-Poppins font-bold mt-8 mb-8 text-black text-center ">
        Computer Booking System
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 rounded-md gap-4">
        {filteredPcs.map((pc) => (
          <div
            key={pc.id}
            className={`p-5 ml-10 rounded-md text-center cursor-pointer shadow-lg text-white ${"overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer  z-10 group flex items-center justify-center"}`}
            onClick={() => handlePcClick(pc)}
          >
            <span class="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
            <span class="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
            <span class="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
            <span class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              Details
            </span>
            {pc.name}
          </div>
        ))}
      </div>
      {selectedPc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 rounded border border-stroke bg-white shadow-default">
            <h3 className="font-medium text-black">PC Details</h3>
            <p className="text-black">Name: {selectedPc.name}</p>
            <p className="text-black">Condition: {selectedPc.condition}</p>
            <p className="text-black">
              Software: {selectedPc.software.join(", ")}
            </p>
            <p className="text-black">
              {" "}
              Version: {selectedPc.Version.join(",")}
            </p>
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
  );
};

export default Inventory;
