import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    image: assets.profile_pic,
    phone: "123-456-7890",
    address: {
      line1: "123 Main Street",
      line2: "Apt 4B",
    },
    gender: "Male",
    dob: "1990-01-01",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent],
          [child]: value
        }
      });
    } else {
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    // Here you would typically send the updated data to your server
    console.log("Saving user data:", userData);
    setIsEdit(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F2DE] py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#D84040] p-6 text-white">
          <h1 className="text-2xl font-bold text-center">My Profile</h1>
        </div>

        <div className="p-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#ECDCBF] mb-4">
              <img 
                src={userData.image} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {isEdit && (
              <button className="text-sm text-[#A31D1D] hover:underline">
                Change Photo
              </button>
            )}
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Name</label>
              {isEdit ? (
                <input 
                  type="text" 
                  name="name"
                  value={userData.name} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Email</label>
              {isEdit ? (
                <input 
                  type="email" 
                  name="email"
                  value={userData.email} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Phone</label>
              {isEdit ? (
                <input 
                  type="tel" 
                  name="phone"
                  value={userData.phone} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Address Line 1</label>
              {isEdit ? (
                <input 
                  type="text" 
                  name="address.line1"
                  value={userData.address.line1} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.address.line1}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Address Line 2</label>
              {isEdit ? (
                <input 
                  type="text" 
                  name="address.line2"
                  value={userData.address.line2} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.address.line2}</p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Gender</label>
              {isEdit ? (
                <select 
                  name="gender"
                  value={userData.gender} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Date of Birth</label>
              {isEdit ? (
                <input 
                  type="date" 
                  name="dob"
                  value={userData.dob} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.dob}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            {isEdit ? (
              <>
                <button 
                  onClick={handleEditToggle}
                  className="px-4 py-2 border border-[#D84040] text-[#D84040] rounded-md hover:bg-[#F8F2DE] transition-colors duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#D84040] text-white rounded-md hover:bg-[#A31D1D] transition-colors duration-300"
                >
                  Save
                </button>
              </>
            ) : (
              <button 
                onClick={handleEditToggle}
                className="px-4 py-2 bg-[#D84040] text-white rounded-md hover:bg-[#A31D1D] transition-colors duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;