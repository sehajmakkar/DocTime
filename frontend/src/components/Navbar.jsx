import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 backdrop-blur-md bg-white/70 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-[#D84040] text-[#F8F2DE] h-10 w-10 rounded-full flex items-center justify-center font-bold">
                MD
              </div>
              <h1 className="ml-3 text-xl font-bold text-[#A31D1D]">
                MediConnect
              </h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex space-x-8 mr-8">
              <Link to="/" className="text-[#A31D1D] hover:text-[#D84040] px-3 py-2 text-base font-medium transition-colors">
                Home
              </Link>
              <Link to="/doctors" className="text-[#A31D1D] hover:text-[#D84040] px-3 py-2 text-base font-medium transition-colors">
                All Doctors
              </Link>
              <Link to="/about" className="text-[#A31D1D] hover:text-[#D84040] px-3 py-2 text-base font-medium transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-[#A31D1D] hover:text-[#D84040] px-3 py-2 text-base font-medium transition-colors">
                Contact
              </Link>
            </div>
            <button className="bg-[#D84040] hover:bg-[#A31D1D] text-white py-2 px-4 rounded font-medium transition-colors">
              Create Account
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#A31D1D] hover:text-[#D84040]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#ECDCBF]/80 backdrop-blur-sm">
          <Link to="/" className="text-[#A31D1D] hover:bg-[#ECDCBF] hover:text-[#D84040] block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link to="/doctors" className="text-[#A31D1D] hover:bg-[#ECDCBF] hover:text-[#D84040] block px-3 py-2 rounded-md text-base font-medium">
            All Doctors
          </Link>
          <Link to="/about" className="text-[#A31D1D] hover:bg-[#ECDCBF] hover:text-[#D84040] block px-3 py-2 rounded-md text-base font-medium">
            About
          </Link>
          <Link to="/contact" className="text-[#A31D1D] hover:bg-[#ECDCBF] hover:text-[#D84040] block px-3 py-2 rounded-md text-base font-medium">
            Contact
          </Link>
          <div className="pt-2">
            <button className="w-full bg-[#D84040] hover:bg-[#A31D1D] text-white py-2 px-4 rounded font-medium transition-colors">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;