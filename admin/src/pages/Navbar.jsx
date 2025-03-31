import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 px-4 py-3">
      <div className="flex justify-between items-center w-full p-4 rounded-xl bg-opacity-70 backdrop-blur-md" 
           style={{ backgroundColor: 'rgba(236, 220, 191, 0.7)', border: '1px solid rgba(248, 242, 222, 0.3)' }}>
        
        {/* Logo and Dashboard Name */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center" 
               style={{ backgroundColor: '#D84040' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F8F2DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl" style={{ color: '#A31D1D' }}>DocApp</h1>
            <p className="text-sm opacity-75" style={{ color: '#A31D1D' }}>
              {aToken ? 'Admin Dashboard' : 'Doctor Dashboard'}
            </p>
          </div>
        </div>
        
        {/* Right Side Elements */}
        <div className="flex items-center space-x-4">
          <button 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all hover:shadow-md cursor-pointer"
            style={{ 
              backgroundColor: '#D84040', 
              color: '#F8F2DE'
            }}
            onClick={() => {
              localStorage.removeItem('aToken');
              window.location.href = '/login';
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;