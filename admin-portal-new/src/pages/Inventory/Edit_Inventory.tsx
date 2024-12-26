import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type PCDetail = {
  id: string;
  name: string;
  serialNum: string | null;
  manufacturer: string | null;
  model: string | null;
  processor: string | null;
  memoryType: string | null;
  memorySize: string | null;
  storageType: string | null;
  storageSize: string | null;
  operatingSystem: string | null;
  purchaseDate: string | null;
  purchaseCost: string | null;
  warrantyExpiry: string | null;
  shortNote: string | null;
  lastMaintenanceDate: string | null;
  nextMaintenanceDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: string;
  installedSoftwares: string[];
};

const Edit_Inventory = () => {
  const { id } = useParams<{ id: string }>();
  const INVENTORY_API_URL = `http://localhost:8085/api/v1/inventories/${id}`;

  const [pcDetail, setPcDetail] = useState<PCDetail | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(INVENTORY_API_URL)
      .then(response => {
        const pcDetail = response.data.data as PCDetail;
        setPcDetail(pcDetail);
      })
      .catch(error => {
        console.error('Error fetching PC details:', error);
      });
  }, [INVENTORY_API_URL]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();

    if (pcDetail) {
      const updatedData = { ...pcDetail,updatedBy: "1fa5094f-cf93-4df4-b830-327bab301bb8" };

      axios.put(`${INVENTORY_API_URL}`, updatedData)
        .then(() => {
          setIsEditing(false);
        })
        .catch(error => {
          console.error('Error saving PC details:', error);
        });
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Inventory / Edit" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark flex justify-between items-center">
                <h3 className="font-medium text-black dark:text-white">
                  PC Information
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
                  {pcDetail && (
                    <>
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={pcDetail.name}
                          onChange={(e) => setPcDetail({ ...pcDetail, name: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>
                      
                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="serialNum"
                        >
                          Serial Number
                        </label>
                        <input
                          id="serialNum"
                          type="text"
                          value={pcDetail.serialNum || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, serialNum: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="manufacturer"
                        >
                          Manufacturer
                        </label>
                        <input
                          id="manufacturer"
                          type="text"
                          value={pcDetail.manufacturer || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, manufacturer: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="model"
                        >
                          Model
                        </label>
                        <input
                          id="model"
                          type="text"
                          value={pcDetail.model || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, model: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="processor"
                        >
                          Processor
                        </label>
                        <input
                          id="processor"
                          type="text"
                          value={pcDetail.processor || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, processor: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="memoryType"
                        >
                          Memory Type
                        </label>
                        <input
                          id="memoryType"
                          type="text"
                          value={pcDetail.memoryType || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, memoryType: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="memorySize"
                        >
                          Memory Size
                        </label>
                        <input
                          id="memorySize"
                          type="text"
                          value={pcDetail.memorySize || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, memorySize: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="storageType"
                        >
                          Storage Type
                        </label>
                        <input
                          id="storageType"
                          type="text"
                          value={pcDetail.storageType || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, storageType: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="storageSize"
                        >
                          Storage Size
                        </label>
                        <input
                          id="storageSize"
                          type="text"
                          value={pcDetail.storageSize || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, storageSize: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="operatingSystem"
                        >
                          Operating System
                        </label>
                        <input
                          id="operatingSystem"
                          type="text"
                          value={pcDetail.operatingSystem || ''}
                          onChange={(e) => setPcDetail({ ...pcDetail, operatingSystem: e.target.value })}
                          disabled={!isEditing}
                          className={`w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary ${
                            !isEditing ? 'bg-opacity-50' : ''
                          }`}
                        />
                      </div>

                      {/* Additional fields here... */}

                      {isEditing && (
                        <div className="flex justify-end gap-2.5">
                          <button
                            type="button"
                            className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Edit_Inventory;
