import DefaultLayout from '../layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../components/Modal'; // Adjust the path if needed

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  mobile: string;
  gender: string;
  userRoleId: string;
  professionId: string;
  semester: number;
  regNum: string;
  departmentId: string;
  currentCourseIds: string[];
  userPrincipalName: string;
  tempPassword: string;
  photoUrl: string;
  createdBy: string;
}

const Student: React.FC = () => {
  const [studentDetails, setStudentDetails] = useState<Student[]>([]);
  const [currentStudent, setCurrentStudent] = useState<Partial<Student> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get('http://localhost:8084/api/v1/users/students?page=1&size=999');
        const { results } = response.data.data;
        setStudentDetails(results);
      } catch (error) {
        setError('Error fetching student data.');
      }
    };

    fetchStudent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentStudent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

// Default values
const defaultValues = {
  userRoleId: 'a6270bcb-383a-4286-b4bc-03f5d0c00333',
  createdBy: '2d13296c-7d3b-4496-b049-4848b5e07402',
  departmentId: 'fca6615e-b585-49e5-a849-b7ec31fd8f1d',
  currentCourseIds: [
    '59060101-54ea-4c0e-aa5c-f4eca08b4ecc',
    'b3962fa5-bc56-43dd-b370-50112c86858a'
  ],
  professionId: '8c64bbdd-f562-4291-8ddf-58c80d310c52'
};

    try {
      if (currentStudent) {
        const response = await axios.post('http://localhost:8084/api/v1/users/students', {
          ...currentStudent,
          ...defaultValues
        });
        const addedStudent = response.data.data;
        setStudentDetails(prevState => [...prevState, addedStudent]);
        setCurrentStudent(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      setError('Error adding new student.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student: Student) => {
    setCurrentStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (studentId: string) => {
    try {
      await axios.delete(`http://localhost:8084/api/v1/users/students/${studentId}`);
      setStudentDetails(studentDetails.filter((student) => student.id !== studentId));
    } catch (error) {
      setError('Error deleting student.');
    }
  };

  const handleCancel = () => {
    setCurrentStudent(null);
    setIsModalOpen(false);
  };

  const handleAddStudent = () => {
    setCurrentStudent({
      id: '',
      firstName: '',
      lastName: '',
      displayName: '',
      mobile: '',
      gender: '',
      userRoleId: 'a6270bcb-383a-4286-b4bc-03f5d0c00333',
      professionId: '8c64bbdd-f562-4291-8ddf-58c80d310c52',
      departmentId: 'fca6615e-b585-49e5-a849-b7ec31fd8f1d',
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
          <h2 className="text-2xl font-bold mb-6">Student Management</h2>
          <button
            onClick={handleAddStudent}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mb-4 hover:bg-blue-600"
          >
            Add New Student
          </button>

          {/* Student List */}
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
                {studentDetails.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="py-2 px-4">{student.firstName}</td>
                    <td className="py-2 px-4">{student.lastName}</td>
                    <td className="py-2 px-4">{student.mobile}</td>
                    <td className="py-2 px-4">{student.gender}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
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

          {/* Modal for Add/Edit Student Form */}
          <Modal isOpen={isModalOpen} onClose={handleCancel}>
            <div>
              <h3 className="text-xl font-bold mb-4">
                {currentStudent?.id ? 'Edit Student' : 'Add New Student'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={currentStudent?.firstName || ''}
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
                      value={currentStudent?.lastName || ''}
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
                      value={currentStudent?.displayName || ''}
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
                      value={currentStudent?.mobile || ''}
                      onChange={handleInputChange}
                      className="border p-2 w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Gender</label>
                    <select
                      name="gender"
                      value={currentStudent?.gender || ''}
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

export default Student;
