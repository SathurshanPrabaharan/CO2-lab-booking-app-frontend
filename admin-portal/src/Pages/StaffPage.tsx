import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

const StaffPage: React.FC = () => {
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

    try {
      if (currentStaff) {
        const response = await axios.post('http://localhost:8084/api/v1/users/staffs', currentStaff);
        const addedStaff = response.data.data;
        setStaffDetails(prevState => [...prevState, addedStaff]);
        setCurrentStaff(null);
        setShowForm(false);
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
      userRoleId: '',
      professionId: '',
      departmentId: '',
      responsibleCourseIds: [],
      userPrincipalName: '',
      tempPassword: '',
      photoUrl: '',
      createdBy: ''
    });
    setShowForm(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl text-black font-bold text-center mb-6">Staff Page</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Add Staff Form */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(prev => !prev)} // Toggle form visibility
            className="text-lg bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {showForm ? 'Hide Form' : 'Add New Staff'}
          </button>
          {showForm && (
            <div className="mt-4">
              <h3 className="text-2xl mb-4 text-black">{currentStaff && currentStaff.id ? 'Edit Staff' : 'Add New Staff'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields here */}
                <div>
                  <label className="block text-black">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={currentStaff?.firstName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={currentStaff?.lastName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={currentStaff?.displayName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={currentStaff?.mobile || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={currentStaff?.gender || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">User Role ID</label>
                  <input
                    type="text"
                    name="userRoleId"
                    value={currentStaff?.userRoleId || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Profession ID</label>
                  <input
                    type="text"
                    name="professionId"
                    value={currentStaff?.professionId || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Department ID</label>
                  <input
                    type="text"
                    name="departmentId"
                    value={currentStaff?.departmentId || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Responsible Course IDs (comma separated)</label>
                  <input
                    type="text"
                    name="responsibleCourseIds"
                    value={(currentStaff?.responsibleCourseIds || []).join(', ')}
                    onChange={(e) =>
                      setCurrentStaff(prevState => ({
                        ...prevState,
                        responsibleCourseIds: e.target.value.split(', ').map(id => id.trim())
                      }))
                    }
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">User Principal Name</label>
                  <input
                    type="text"
                    name="userPrincipalName"
                    value={currentStaff?.userPrincipalName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Temporary Password</label>
                  <input
                    type="text"
                    name="tempPassword"
                    value={currentStaff?.tempPassword || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Photo URL</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={currentStaff?.photoUrl || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Created By</label>
                  <input
                    type="text"
                    name="createdBy"
                    value={currentStaff?.createdBy || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="text-lg bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300"
                  >
                    {currentStaff?.id ? 'Update Staff' : 'Add Staff'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-lg bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 ml-4"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        
        {/* Staff Table */}
        <div>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-4 text-left text-blue-900">First Name</th>
                <th className="py-2 px-4 text-left text-blue-900">Last Name</th>
                <th className="py-2 px-4 text-left text-blue-900">Mobile</th>
                <th className="py-2 px-4 text-left text-blue-900">Gender</th>
                <th className="py-2 px-4 text-left text-blue-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffDetails.map((staff) => (
                <tr key={staff.id} className="border-b">
                  <td className="py-2 px-4 text-black">{staff.firstName}</td>
                  <td className="py-2 px-4 text-black">{staff.lastName}</td>
                  <td className="py-2 px-4 text-black">{staff.mobile}</td>
                  <td className="py-2 px-4 text-black">{staff.gender}</td>
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
      </div>
    </div>
  );
};

export default StaffPage;
