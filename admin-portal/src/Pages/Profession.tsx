import React, { useState } from 'react';
import { FaIdBadge, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Profession {
  id: number;
  name: string;
  professionId: string;
}

const sampleProfessions: Profession[] = [
  { id: 1, name: 'Software Engineer', professionId: 'P001' },
  { id: 2, name: 'Data Scientist', professionId: 'P002' },
  { id: 3, name: 'Network Engineer', professionId: 'P003' },
  { id: 4, name: 'Database Administrator', professionId: 'P004' },
];

const ProfessionPage: React.FC = () => {
  const [professions, setProfessions] = useState<Profession[]>(sampleProfessions);
  const [currentProfession, setCurrentProfession] = useState<Profession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentProfession) {
      setCurrentProfession({
        ...currentProfession,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProfession) {
      if (currentProfession.id) {
        setProfessions(professions.map(profession => (profession.id === currentProfession.id ? currentProfession : profession)));
      } else {
        const newProfession = { ...currentProfession, id: Date.now() };
        setProfessions([...professions, newProfession]);
      }
      setCurrentProfession(null);
      setIsModalOpen(false);
    }
  };

  const handleEdit = (profession: Profession) => {
    setCurrentProfession(profession);
    setIsModalOpen(true);
  };

  const handleDelete = (professionId: number) => {
    setProfessions(professions.filter(profession => profession.id !== professionId));
  };

  const handleCancel = () => {
    setCurrentProfession(null);
    setIsModalOpen(false);
  };

  const handleAddProfession = () => {
    setCurrentProfession({ id: 0, name: '', professionId: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Professions</h2>
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleAddProfession} 
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Profession
          </button>
        </div>
        <ul className="space-y-4">
          {professions.map(profession => (
            <li key={profession.id} className="text-lg text-gray-700 bg-gray-200 p-4 rounded-lg shadow flex justify-between items-center">
              <span>{profession.name} - {profession.professionId}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(profession)}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(profession.id)}
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
            <h3 className="text-2xl font-bold mb-4">{currentProfession && currentProfession.id ? 'Edit Profession' : 'Add Profession'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <label htmlFor="name" className="block text-left mb-2 text-xl text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentProfession ? currentProfession.name : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="professionId" className="block text-left mb-2 text-xl text-black">Profession</label>
                <input
                  type="text"
                  name="professionId"
                  value={currentProfession ? currentProfession.professionId : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full text-lg mt-6 rounded-full bg-emerald-600 text-white py-2 hover:bg-emerald-700 focus:outline-none"
                >
                  {currentProfession && currentProfession.id ? 'Update Profession' : 'Add Profession'}
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

export default ProfessionPage;
