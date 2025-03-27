import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/v1/user/get-profile`, 
          {
            headers: { token }
          }
        );

        if (response.data.success) {
          // Ensure address has both line1 and line2, even if they're empty
          const userWithAddress = {
            ...response.data.user,
            address: {
              line1: response.data.user.address?.line1 || '',
              line2: response.data.user.address?.line2 || ''
            }
          };
          setUserData(userWithAddress);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error(error.message);
      }
    };

    fetchProfile();
  }, [setUserData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Handle image file upload
    if (name === 'image') {
      const file = files[0];
      setImageFile(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
      return;
    }

    // Handle nested address fields
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setUserData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
      return;
    }

    // Handle other fields
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('email', userData.email);
      
      // Ensure address is stringified correctly
      formData.append('address', JSON.stringify({
        line1: userData.address.line1 || '',
        line2: userData.address.line2 || ''
      }));
      
      formData.append('dob', userData.dob);
      formData.append('gender', userData.gender);
      
      // Append image if a new file was selected
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/update-profile`, formData, {
        headers: { 
          token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setIsEdit(false);
        window.location.reload();
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!userData) return <div>Loading...</div>;

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
              <>
                <input 
                  type="file" 
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label 
                  htmlFor="imageUpload"
                  className="text-sm text-[#A31D1D] hover:underline cursor-pointer"
                >
                  Change Photo
                </label>
              </>
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
                  value={userData.name || ''} 
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
                  value={userData.email || ''} 
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
                  value={userData.phone || ''} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.phone}</p>
              )}
            </div>

            {/* Address Line 1 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Address Line 1</label>
              {isEdit ? (
                <input 
                  type="text" 
                  name="address.line1"
                  value={userData.address?.line1 || ''} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.address?.line1}</p>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Address Line 2</label>
              {isEdit ? (
                <input 
                  type="text" 
                  name="address.line2"
                  value={userData.address?.line2 || ''} 
                  onChange={handleChange}
                  className="border border-[#ECDCBF] rounded-md p-2 bg-[#F8F2DE] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded-md">{userData.address?.line2}</p>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">Gender</label>
              {isEdit ? (
                <select 
                  name="gender"
                  value={userData.gender || ''} 
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
                  value={userData.dob || ''} 
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
                  disabled={isLoading}
                  className={`px-4 py-2 bg-[#D84040] text-white rounded-md hover:bg-[#A31D1D] transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Saving...' : 'Save'}
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