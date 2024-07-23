import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';
import axios from 'axios';


const STAFF_API_URL = 'http://localhost:8084/api/v1/users/staffs/4a2ca96b-a846-476a-b8df-d5007af084fb';
const COURSE_API_URL = 'http://localhost:8086/api/v1/configurations/courses?page=1&size=10'


const Settings = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [mobile, setMobile] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [department, setDepartment] = useState('');
  const [responsibleCourses, setResponsibleCourses] = useState<MultiValue<{ value: string; label: string }>>([]);
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [savedData, setSavedData] = useState<any>(null);  // Added state for saved data

  const [courseOptions, setCourseOptions] = useState<{ value: string; label: string }[]>([]);


  useEffect(() => {
    axios.get(STAFF_API_URL)
      .then(response => {
        const staff = response.data.data;
        setSavedData(staff);  // Save the response data

        // Populate the form fields with the saved data
        setFirstName(staff.firstName || '');
        setLastName(staff.lastName || '');
        setDisplayName(staff.displayName || '');
        setMobile(staff.mobile || '');
        setGender(staff.gender || '');
        setEmail(staff.contact_email || '');
        setProfession(staff.profession ? staff.profession.name : null);
        setDepartment(staff.department? staff.department.name : null);
        setResponsibleCourses(staff.responsibleCourses.map((course: string) => ({ value: course, label: course })));
        setStatus(staff.status || '');
      })
      .catch(error => {
        console.error('Error fetching staff details:', error);
      });
  }, []);

  useEffect(() => {
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
      });
  }, []);
  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();

    const responsibleCourseIds= responsibleCourses.map((course) => course.value);
    
    const updatedData = {
      firstName,
      lastName,
      displayName,
      mobile,
      gender: savedData.gender,
      userRoleId: savedData.userRole.id,
      professionId: savedData.profession ? savedData.profession.id : null,
      departmendId: savedData.department ? savedData.department.id : null,
      responsibleCourseIds,
      contact_email: email,
      photoUrl: savedData.photoUrl,
      isInitalLogged: savedData.isInitalLogged,
      verifyToken: savedData.verifyToken,
      tokenIssuedAt: savedData.tokenIssuedAt,
      status: savedData.status,
      updatedBy: savedData.id,
      wantToEnableAccount: false
    };
  
    console.log('Updated Data:', updatedData);  // Log the data being sent
  
    axios.put(`${STAFF_API_URL}`, updatedData)
      .then(() => {
        setIsEditing(false);
        // Optionally refresh the data or show a success message
      })
      .catch(error => {
        console.error('Error saving staff details:', error);
      });
  };
  

  const handleCoursesChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    setResponsibleCourses(newValue as { value: string; label: string }[]);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white">
                  Personal Information
                </h3>
                {!isEditing && (
                  <button
                    className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
                    onClick={handleEditClick}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="p-7">
                <form onSubmit={handleSaveClick}>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="displayName"
                    >
                      Display Name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="mobile"
                    >
                      Mobile
                    </label>
                    <input
                      id="mobile"
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <input
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      disabled
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    >
                    </input>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="profession"
                    >
                      Profession
                    </label>
                    <input
                      id="profession"
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      disabled
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <input
                      id="department"
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      disabled
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="responsibleCourses"
                    >
                      Responsible Courses
                    </label>
                    <Select
                      id="responsibleCourses"
                      isDisabled={!isEditing}
                      isMulti
                      options={courseOptions}
                      value={responsibleCourses}
                      onChange={handleCoursesChange}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <input
                      id="status"
                      type="text"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                        !isEditing ? 'bg-opacity-50' : ''
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4">
                    {isEditing && (
                      <>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.86161 13.1381C2.98664 13.2632 3.15622 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2632 13.1377 13.1381C13.2627 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
