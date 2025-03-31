import React, { useState, useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData, backendUrl } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: { line1: '', line2: '' },
    fees: 0,
    available: false
  });

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFormData({
        address: profileData.address || { line1: '', line2: '' },
        fees: profileData.fees || 0,
        available: profileData.available || false
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'line1' || name === 'line2') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        address: formData.address,
        fees: formData.fees,
        available: formData.available
      };

      const { data } = await axios.post(`${backendUrl}/api/v1/doctor/update-profile`, updateData, {
        headers: {
          dToken
        }
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F8F2DE]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D84040]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8F2DE] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with image and basic info */}
        <div className="relative">
          <div className="h-40 bg-gradient-to-r from-[#A31D1D] to-[#D84040]"></div>
          <div className="absolute top-24 left-6 flex items-end">
            <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <img 
                src={profileData.image} 
                alt={profileData.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 mb-4">
              <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
              <p className="text-white opacity-90">
                {profileData.degree} • {profileData.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="pt-20 px-6 pb-6">
          {/* Experience badge */}
          <div className="mb-6 flex items-center">
            <span className="bg-[#ECDCBF] px-4 py-1 rounded-full text-[#A31D1D] font-medium">
              {profileData.experience} Years Experience
            </span>
          </div>

          {/* About section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-[#A31D1D] mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">
              {profileData.about}
            </p>
          </div>

          {/* Details section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Appointment Fee */}
            <div className="bg-[#F8F2DE] rounded-lg p-4">
              <h3 className="text-[#A31D1D] font-semibold mb-1">Appointment Fee</h3>
              {isEdit ? (
                <div className="flex items-center">
                  <span className="text-[#A31D1D] text-xl font-bold mr-2">₹</span>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="border border-[#ECDCBF] rounded px-2 py-1 w-24 text-lg"
                  />
                </div>
              ) : (
                <p className="text-[#A31D1D] text-xl font-bold">₹{profileData.fees}</p>
              )}
            </div>

            {/* Address */}
            <div className="bg-[#F8F2DE] rounded-lg p-4">
              <h3 className="text-[#A31D1D] font-semibold mb-1">Clinic Address</h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="line1"
                    value={formData.address.line1}
                    onChange={handleChange}
                    placeholder="Address Line 1"
                    className="border border-[#ECDCBF] rounded px-2 py-1 w-full"
                  />
                  <input
                    type="text"
                    name="line2"
                    value={formData.address.line2}
                    onChange={handleChange}
                    placeholder="Address Line 2"
                    className="border border-[#ECDCBF] rounded px-2 py-1 w-full"
                  />
                </div>
              ) : (
                <p className="text-gray-700">
                  {profileData.address?.line1}
                  {profileData.address?.line2 && (
                    <span>, {profileData.address.line2}</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Availability toggle */}
          <div className="mt-6 flex items-center">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name="available"
                  className="sr-only"
                  checked={isEdit ? formData.available : profileData.available}
                  onChange={isEdit ? handleChange : () => {}}
                  disabled={!isEdit}
                />
                <div className={`block w-14 h-8 rounded-full ${isEdit ? formData.available ? 'bg-[#A31D1D]' : 'bg-gray-300' : profileData.available ? 'bg-[#A31D1D]' : 'bg-gray-300'} transition-colors duration-200`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 transform ${isEdit ? formData.available ? 'translate-x-6' : 'translate-x-0' : profileData.available ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                Currently {isEdit ? formData.available ? 'Available' : 'Unavailable' : profileData.available ? 'Available' : 'Unavailable'} for Appointments
              </div>
            </label>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {isEdit ? (
              <>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setFormData({
                      address: profileData.address || { line1: '', line2: '' },
                      fees: profileData.fees || 0,
                      available: profileData.available || false
                    });
                  }}
                  className="px-4 py-2 border border-[#A31D1D] text-[#A31D1D] rounded-md hover:bg-[#F8F2DE] transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  className="px-4 py-2 bg-[#A31D1D] text-white rounded-md hover:bg-[#D84040] transition-colors flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 bg-[#A31D1D] text-white rounded-md hover:bg-[#D84040] transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;