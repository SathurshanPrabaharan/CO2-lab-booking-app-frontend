import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COURSE_API_URL = 'http://localhost:8086/api/v1/configurations/courses?page=1&size=10';

const LabBook = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirementDescription, setRequirementDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [courseOptions, setCourseOptions] = useState<{ value: string, label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract date from query params if present
    const queryParams = new URLSearchParams(location.search);
    const dateParam = queryParams.get('date');
    if (dateParam) {
      setDate(dateParam);
    }

    // Fetch course options
    axios.get(COURSE_API_URL)
      .then(response => {
        const courses = response.data.data.results;
        const options = courses.map((course: { id: string, code: string }) => ({
          value: course.id,
          label: course.code
        }));
        setCourseOptions(options);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
        setError('Failed to load course options.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!title || !courseId || !date || !startTime || !endTime) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8087/api/v1/bookings/valid-bookings', {
        title,
        description,
        requirementDescription,
        courseId,
        date,
        startTime,
        endTime,
        createdByStaffId: '4a2ca96b-a846-476a-b8df-d5007af084fb' // This can be dynamic if needed
      });

      console.log('Booking successful:', response.data);
      toast.success('Lab booked successfully!');
    } catch (error) {
      console.error('Error booking lab:', error);
      toast.error('Error booking lab. Please try again.');
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Lab Booking Form" />

      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Lab Booking Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label htmlFor="title" className="mb-2.5 block text-black dark:text-white">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label htmlFor="description" className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label htmlFor="requirementDescription" className="mb-2.5 block text-black dark:text-white">
                    Requirement Description
                  </label>
                  <input
                    id="requirementDescription"
                    type="text"
                    value={requirementDescription}
                    onChange={(e) => setRequirementDescription(e.target.value)}
                    placeholder="Enter any additional requirements"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label htmlFor="courseId" className="mb-2.5 block text-black dark:text-white">
                    Course
                  </label>
                  {loading ? (
                    <p>Loading courses...</p>
                  ) : error ? (
                    <p className="text-red-500">{error}</p>
                  ) : (
                    <select
                      id="courseId"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      {courseOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="mb-4.5">
                  <label htmlFor="date" className="mb-2.5 block text-black dark:text-white">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label htmlFor="startTime" className="mb-2.5 block text-black dark:text-white">
                    Start Time
                  </label>
                  <input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label htmlFor="endTime" className="mb-2.5 block text-black dark:text-white">
                    End Time
                  </label>
                  <input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded"
                  >
                    Book Lab
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default LabBook;
