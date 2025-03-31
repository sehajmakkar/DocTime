import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const navigate = useNavigate();
  const { specialization } = useParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [activeFilter, setActiveFilter] = useState(specialization || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const { doctors } = useContext(AppContext);

  // Specialties list
  const specialties = [
    'All',
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Gastroenterologist'
  ];

  // Filter doctors based on specialization and search query
  useEffect(() => {
    let result = doctors;
    
    if (activeFilter !== 'All') {
      result = doctors.filter(doctor => 
        doctor.specialization.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    if (searchQuery) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredDoctors(result);
  }, [doctors, activeFilter, searchQuery]);

  return (
    <div className="container mx-auto p-4 bg-[#F8F2DE]">
      <h1 className="text-3xl font-bold text-[#A31D1D] mb-6">Find Your Doctor</h1>
      
      {/* Search bar */}
      <div className="w-full mb-6">
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className="w-full p-3 rounded-md border border-[#ECDCBF] focus:outline-none focus:ring-2 focus:ring-[#D84040]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filter panel */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-4 h-fit">
          <p className="text-xl font-semibold text-[#A31D1D] mb-4">Browse Specializations</p>
          <div className="space-y-2">
            {specialties.map((specialization, index) => (
              <div 
                key={index} 
                className={`p-2 rounded-md cursor-pointer transition-colors ${
                  activeFilter === specialization 
                    ? 'bg-[#D84040] text-white' 
                    : 'hover:bg-[#ECDCBF]'
                }`}
                onClick={() => setActiveFilter(specialization)}
              >
                <p className="font-medium">{specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctors list */}
        <div className="w-full md:w-3/4">
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex">
                  <div className="w-1/3">
                    <img 
                      src={doctor.image} 
                      alt={`Dr. ${doctor.name}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{doctor.name}</h3>
                        <p className="text-gray-600">{doctor.specialization}</p>
                      </div>
                      <span className="bg-[#ECDCBF] text-[#D84040] text-sm py-1 px-2 rounded-full">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="mr-2">⭐ 4.8</span>
                      <span>(120 reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {doctor.experience || '10+ years experience'} • {doctor.location || 'Downtown Clinic'}
                    </p>
                    <div className="flex space-x-2">
                      <button onClick={() => navigate(`/appointment/${doctor._id}`)} className="flex-1 bg-[#D84040] hover:bg-[#A31D1D] text-white py-2 px-3 rounded-md transition-colors duration-300">
                        Book Appointment
                      </button>
                      <button className="px-3 py-2 border border-[#D84040] text-[#D84040] rounded-md hover:bg-[#ECDCBF] transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-xl text-gray-600">No doctors found matching your criteria</p>
              <button 
                className="mt-4 bg-[#D84040] hover:bg-[#A31D1D] text-white py-2 px-4 rounded-md transition-colors duration-300"
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;