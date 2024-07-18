import React, { useState } from "react";

interface ModuleDropdownProps {
  modules: { code: string; name: string }[];
  addModule: (module: { code: string; name: string }) => void;
}

const ModuleDropdown: React.FC<ModuleDropdownProps> = ({
  modules,
  addModule,
}) => {
  const [selectedModule, setSelectedModule] = useState<{
    code: string;
    name: string;
  }>(modules[0]);

  const handleModuleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModuleCode = event.target.value;
    const selectedModule = modules.find(
      (module) => module.code === selectedModuleCode
    );
    if (selectedModule) {
      setSelectedModule(selectedModule);
    }
  };

  const handleAddModule = () => {
    addModule(selectedModule);
  };

  return (
    <div className="flex items-center space-x-5">
      <select
        value={selectedModule.code}
        onChange={handleModuleChange}
        className="block w-96 px-6 md:px-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
      >
        {modules.map((module) => (
          <option key={module.code} value={module.code}>
            {module.name}
          </option>
        ))}
      </select>
      <button
        onClick={handleAddModule}
        className="px-8 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Update
      </button>
    </div>
  );
};

export default ModuleDropdown;
