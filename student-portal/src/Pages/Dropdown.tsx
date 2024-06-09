import React, { useState } from "react";

interface ModuleDropdownProps {
  modules: string[];
  addModule: (module: string) => void;
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({
  modules,
  addModule,
}) => {
  const [selectedModule, setSelectedModule] = useState<string>(modules[0]);

  const handleModuleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModule(event.target.value);
  };

  const handleAddModule = () => {
    addModule(selectedModule);
  };

  return (
    <div className="flex items-center space-x-10">
      <select
        value={selectedModule}
        onChange={handleModuleChange}
        className="block w-96 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
      >
        {modules.map((module) => (
          <option key={module} value={module}>
            {module}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddModule}
        className="px-12 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Update
      </button>
    </div>
  );
};

export default ModuleDropdown;