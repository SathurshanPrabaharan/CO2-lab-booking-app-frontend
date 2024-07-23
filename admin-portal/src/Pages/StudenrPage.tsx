import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({});
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8084/api/v1/users/students?page=1&size=999');
        const { results } = response.data.data;
        setStudents(results);
      } catch (error) {
        setError('Error fetching student data.');
      }
    };

    fetchStudents();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8084/api/v1/users/students', newStudent);
      const addedStudent = response.data.data; // Assuming the API returns the created student
      setStudents(prevState => [...prevState, addedStudent]);
      setNewStudent({});
      setShowForm(false); // Hide the form after adding
    } catch (error) {
      setError('Error adding new student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl text-black font-bold text-center mb-6">Student Management</h2>
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Add Student Form */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(prev => !prev)} // Toggle form visibility
            className="text-lg bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {showForm ? 'Hide Form' : 'Add New Student'}
          </button>
          {showForm && (
            <div className="mt-4">
              <h3 className="text-2xl mb-4 text-black">Add New Student</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form fields here */}
                <div>
                  <label className="block text-black">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={newStudent.firstName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={newStudent.lastName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Display Name</label>
                  <input
                    type="text"
                    name="displayName"
                    value={newStudent.displayName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={newStudent.mobile || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={newStudent.gender || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">User Role ID</label>
                  <input
                    type="text"
                    name="userRoleId"
                    value={newStudent.userRoleId || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Profession ID</label>
                  <input
                    type="text"
                    name="professionId"
                    value={newStudent.professionId || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Semester</label>
                  <input
                    type="number"
                    name="semester"
                    value={newStudent.semester || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Registration Number</label>
                  <input
                    type="text"
                    name="regNum"
                    value={newStudent.regNum || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Department ID</label>
                  <input
                    type="text"
                    name="departmentId"
                    value={newStudent.departmentId || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Current Course IDs (comma separated)</label>
                  <input
                    type="text"
                    name="currentCourseIds"
                    value={newStudent.currentCourseIds?.join(', ') || ''}
                    onChange={(e) =>
                      setNewStudent(prevState => ({ ...prevState, currentCourseIds: e.target.value.split(', ') }))
                    }
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">User Principal Name</label>
                  <input
                    type="text"
                    name="userPrincipalName"
                    value={newStudent.userPrincipalName || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Temporary Password</label>
                  <input
                    type="text"
                    name="tempPassword"
                    value={newStudent.tempPassword || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Photo URL</label>
                  <input
                    type="text"
                    name="photoUrl"
                    value={newStudent.photoUrl || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-black">Created By</label>
                  <input
                    type="text"
                    name="createdBy"
                    value={newStudent.createdBy || ''}
                    onChange={handleInputChange}
                    className="border p-2 w-full text-black bg-gray-100"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Student'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Student List */}
        <ul className="space-y-4">
          {students.map((student) => (
            <li key={student.id} className="bg-gray-200 p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="text-lg text-black">Name: {student.displayName}</p>
                <p className="text-lg text-black">Register Number: {student.regNum}</p>
                <p className="text-lg text-black">Mobile: {student.mobile}</p>
                <p className="text-lg text-black">Department: {student.departmentId}</p>
                <p className="text-lg text-black">Semester: {student.semester}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentManagement;
