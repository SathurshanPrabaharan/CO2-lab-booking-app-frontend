import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal'; // Adjust the path if needed

interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  mobile: string;
  gender: string;
  userRoleId: string;
  professionId: string;
  departmentId: string;
  responsibleCourseIds: string[];
  userPrincipalName: string;
  tempPassword: string;
  photoUrl: string;
  createdBy: string;
}

const Staff: React.FC = () => {
  const [staffDetails, setStaffDetails] = useState<Staff[]>([]);
  const [currentStaff, setCurrentStaff] = useState<Partial<Staff> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8084/api/v1/users/staffs?page=1&size=999');
        const { results } = response.data.data;
        setStaffDetails(results);
      } catch (error) {
        setError('Error fetching staff data.');
      }
    };

    fetchStaff();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentStaff(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const defaultValues = {
      userRoleId: '6cb73460-199a-4553-b993-b271a65b0536',
      createdBy: '2d13296c-7d3b-4496-b049-4848b5e07402',
      departmentId: 'fca6615e-b585-49e5-a849-b7ec31fd8f1d',
      responsibleCourseIds: [
        '59060101-54ea-4c0e-aa5c-f4eca08b4ecc',
        'b3962fa5-bc56-43dd-b370-50112c86858a'
      ],
      professionId: '8c64bbdd-f562-4291-8ddf-58c80d310c52'
    };

    try {
      if (currentStaff) {
        const response = await axios.post('http://localhost:8084/api/v1/users/staffs', {
          ...currentStaff,
          ...defaultValues
        });
        const addedStaff = response.data.data;
        setStaffDetails(prevState => [...prevState, addedStaff]);
        setCurrentStaff(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      setError('Error adding new staff.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (staff: Staff) => {
    setCurrentStaff(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (staffId: string) => {
    try {
      await axios.delete(`http://localhost:8084/api/v1/users/staffs/${staffId}`);
      setStaffDetails(staffDetails.filter((staff) => staff.id !== staffId));
    } catch (error) {
      setError('Error deleting staff.');
    }
  };

  const handleCancel = () => {
    setCurrentStaff(null);
    setIsModalOpen(false);
  };

  const handleAddStaff = () => {
    setCurrentStaff({
      id: '',
      firstName: '',
      lastName: '',
      displayName: '',
      mobile: '',
      gender: '',
      userRoleId: '6cb73460-199a-4553-b993-b271a65b0536',
      professionId: '8c64bbdd-f562-4291-8ddf-58c80d310c52',
      departmentId: 'fca6615e-b585-49e5-a849-b7ec31fd8f1d',
      responsibleCourseIds: [
        '59060101-54ea-4c0e-aa5c-f4eca08b4ecc',
        'b3962fa5-bc56-43dd-b370-50112c86858a'
      ],
      userPrincipalName: '',
      tempPassword: '',
      photoUrl: '',
      createdBy: '2d13296c-7d3b-4496-b049-4848b5e07402'
    });
    setIsModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="bg-gray-100 p-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Staff Management</h2>
          <button
            onClick={handleAddStaff}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-600"
          >
            Add New Staff
          </button>

          {/* Staff List */}
          <div className="bg-white shadow-md rounded mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-blue-100 border-b">
                  <th className="py-2 px-4 text-left">First Name</th>
                  <th className="py-2 px-4 text-left">Last Name</th>
                  <th className="py-2 px-4 text-left">Mobile</th>
                  <th className="py-2 px-4 text-left">Gender</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffDetails.map((staff) => (
                  <tr key={staff.id} className="border-b">
                    <td className="py-2 px-4">{staff.firstName}</td>
                    <td className="py-2 px-4">{staff.lastName}</td>
                    <td className="py-2 px-4">{staff.mobile}</td>
                    <td className="py-2 px-4">{staff.gender}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(staff.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Add/Edit Staff Form */}
          <Modal isOpen={isModalOpen} onClose={handleCancel}>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {currentStaff?.id ? 'Edit Staff' : 'Add New Staff'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={currentStaff?.firstName || ''}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={currentStaff?.lastName || ''}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Display Name</label>
                    <input
                      type="text"
                      name="displayName"
                      value={currentStaff?.displayName || ''}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Mobile</label>
                    <input
                      type="text"
                      name="mobile"
                      value={currentStaff?.mobile || ''}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                      name="gender"
                      value={currentStaff?.gender || ''}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  {/* Add more fields as required */}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Staff;
