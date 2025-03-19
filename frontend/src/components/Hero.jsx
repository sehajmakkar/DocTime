import React from 'react';
import { Link } from 'react-router-dom';
import {assets} from '../assets/assets';

const HeroSection = () => {
  return (
    <div className="w-full mt-15 bg-[#D84040] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
          {/* Left Content */}
          <div className="z-10 max-w-xl mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F2DE] leading-tight mb-6">
              Book Appointment<br />
              With Trusted Doctors
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="flex -space-x-4">
                <img 
                  src={assets.doc1}  
                  alt="Patient 1" 
                  className="w-14 h-14 rounded-full border-2 border-[#F8F2DE]"
                />
                <img 
                  src={assets.doc2}
                  alt="Patient 2" 
                  className="w-14 h-14 rounded-full border-2 border-[#F8F2DE]"
                />
                <img 
                  src={assets.doc3} 
                  alt="Patient 3" 
                  className="w-14 h-14 rounded-full border-2 border-[#F8F2DE]"
                />
              </div>
              <p className="text-[#F8F2DE] ml-4 max-w-xs">
                Simply browse through our extensive list of trusted doctors, 
                schedule your appointment hassle-free.
              </p>
            </div>
            
            <Link to="/appointment">
              <button className="bg-[#F8F2DE] text-[#A31D1D] font-semibold py-3 px-8 rounded-full flex items-center transition-all hover:bg-[#ECDCBF]">
                Book appointment
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </Link>
          </div>
          
          {/* Right Content - Doctors Image */}
          <div className="relative md:absolute md:right-0 md:top-0 h-full flex items-center">
            <div className="h-64 md:h-auto">
              <img 
                src={assets.header_img} 
                alt="Doctor Team" 
                className="h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;