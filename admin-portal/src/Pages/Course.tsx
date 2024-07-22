import React, { useState } from 'react';
import { FaBook, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Course {
  id: number;
  name: string;
  code: string;
  type: string;
  semester: string;
  department: string;
  coordinator: string;
}

const sampleCourses: Course[] = [
  { id: 1, name: 'Introduction to Programming', code: 'CS101', type: 'Core', semester: '1st', department: 'Computer Science', coordinator: 'Dr. John Doe' },
  { id: 2, name: 'Data Structures', code: 'CS102', type: 'Core', semester: '2nd', department: 'Computer Science', coordinator: 'Dr. Jane Smith' },
  { id: 3, name: 'Database Systems', code: 'CS201', type: 'Core', semester: '3rd', department: 'Computer Science', coordinator: 'Dr. Emily Davis' },
  { id: 4, name: 'Operating Systems', code: 'CS202', type: 'Core', semester: '4th', department: 'Computer Science', coordinator: 'Dr. Michael Brown' },
];

const CoursePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(sampleCourses);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (currentCourse) {
      setCurrentCourse({
        ...currentCourse,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCourse) {
      if (currentCourse.id) {
        setCourses(courses.map(course => (course.id === currentCourse.id ? currentCourse : course)));
      } else {
        const newCourse = { ...currentCourse, id: Date.now() };
        setCourses([...courses, newCourse]);
      }
      setCurrentCourse(null);
      setIsModalOpen(false);
    }
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (courseId: number) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleCancel = () => {
    setCurrentCourse(null);
    setIsModalOpen(false);
  };

  const handleAddCourse = () => {
    setCurrentCourse({ id: 0, name: '', code: '', type: '', semester: '', department: '', coordinator: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-3/4 bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Courses</h2>
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleAddCourse} 
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-emerald-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Add Course
          </button>
        </div>
        <ul className="space-y-4">
          {courses.map(course => (
            <li key={course.id} className="text-lg text-gray-700 bg-gray-200 p-4 rounded-lg shadow flex justify-between items-center">
              <span>{course.name} - {course.code} - {course.type} - {course.semester} - {course.department} - {course.coordinator}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-blue-500 hover:underline"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
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
            <h3 className="text-2xl font-bold mb-4">{currentCourse && currentCourse.id ? 'Edit Course' : 'Add Course'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="my-4">
                <label htmlFor="name" className="block text-left mb-2 text-xl text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={currentCourse ? currentCourse.name : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="code" className="block text-left mb-2 text-xl text-black">Code</label>
                <input
                  type="text"
                  name="code"
                  value={currentCourse ? currentCourse.code : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="type" className="block text-left mb-2 text-xl text-black">Type</label>
                <input
                  type="text"
                  name="type"
                  value={currentCourse ? currentCourse.type : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="semester" className="block text-left mb-2 text-xl text-black">Semester</label>
                <input
                  type="text"
                  name="semester"
                  value={currentCourse ? currentCourse.semester : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="department" className="block text-left mb-2 text-xl text-black">Department</label>
                <input
                  type="text"
                  name="department"
                  value={currentCourse ? currentCourse.department : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="my-4">
                <label htmlFor="coordinator" className="block text-left mb-2 text-xl text-black">Coordinator</label>
                <input
                  type="text"
                  name="coordinator"
                  value={currentCourse ? currentCourse.coordinator : ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-full text-lg mt-6 rounded-full bg-emerald-600 text-white py-2 hover:bg-emerald-700 focus:outline-none"
                >
                  {currentCourse && currentCourse.id ? 'Update Course' : 'Add Course'}
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

export default CoursePage;
