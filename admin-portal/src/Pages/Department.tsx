import React, { useState } from 'react';
import { FaUniversity, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Department {
  id: number;
  name: string;
  hodId: string;
}

const sampleDepartments: Department[] = [
  { id: 1, name: 'Computer Science', hodId: 'HOD001' },
  { id: 2, name: 'Mechanical Engineering', hodId: 'HOD002' },
  { id: 3, name: 'Electrical Engineering', hodId: 'HOD003' },
  { id: 4, name: 'Civil Engineering', hodId: 'HOD004' },
];

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(sampleDepartments);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentDepartment) {
      setCurrentDepartment({
        ...currentDepartment,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentDepartment) {
      if (currentDepartment.id) {
        setDepartments(departments.map(department => (department.id === currentDepartment.id ? currentDepartment : department)));
      } else {
        const newDepartment = { ...currentDepartment, id: Date.now() };
        setDepartments([...departments, newDepartment]);
      }
      setCurrentDepartment(null);
      setIsModalOpen(false);
    }
  };

  const handleEdit = (department: Department) => {
    setCurrentDepartment(department);
    setIsModalOpen(true);
  };

  const handleDelete = (departmentId: number) => {
    setDepartments(departments.filter(department => department.id !== departmentId));
  };

  const handleCancel = () => {
    setCurrentDepartment(null);
    setIsModalOpen(false);
  };

  const handleAddDepartment = () => {
    setCurrentDepartment({ id: 0, name: '', hodId: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Departments</h2>
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleAddDepartment} 
            className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Department
          </button>
        </div>
        <ul className="space-y-4">
          {departments.map(department => (
            <li key={department.id} className="text-lg text-gray-700 bg-gray-200 p-4 rounded-lg shadow flex justify-between items-center">
              <span>{department.name} - {department.hodId}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(department)}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(department.id)}
                  className="text-red-500 hover:underline"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-1/2">
            <h3 className="text-2xl font-bold mb-4">{currentDepartment && currentDepartment.id ? 'Edit Department' : 'Add Department'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <label htmlFor="name" className="block text-left mb-2 text-xl text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentDepartment ? currentDepartment.name : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="hodId" className="block text-left mb-2 text-xl text-black">HOD</label>
                <input
                  type="text"
                  name="hodId"
                  value={currentDepartment ? currentDepartment.hodId : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full text-lg mt-6 rounded-full bg-emerald-600 text-white py-2 hover:bg-emerald-700 focus:outline-none"
                >
                  {currentDepartment && currentDepartment.id ? 'Update Department' : 'Add Department'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full text-lg mt-6 rounded-full bg-red-600 text-white py-2 hover:bg-red-700 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentPage;
