import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, UserPlus } from 'lucide-react';

const SidePanel = () => {
  const [active, setActive] = useState('/admin-dashboard');
  
  const menuItems = [
    {
      path: '/admin-dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      path: '/doctors-list',
      name: 'Doctors List',
      icon: <Users size={20} />
    },
    {
      path: '/all-appointments',
      name: 'All Appointments',
      icon: <Calendar size={20} />
    },
    {
      path: '/add-doctor',
      name: 'Add Doctor',
      icon: <UserPlus size={20} />
    }
  ];

  return (
    <div className="h-screen w-64 pt-20 px-4" style={{ backgroundColor: '#F8F2DE' }}>
      <div className="rounded-xl py-4 px-2" style={{ backgroundColor: 'rgba(236, 220, 191, 0.5)' }}>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-opacity-90 shadow-md' 
                      : 'hover:bg-opacity-30 hover:shadow-sm'
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#D84040' : 'rgba(236, 220, 191, 0.7)',
                  color: isActive ? '#F8F2DE' : '#A31D1D'
                })}
                onClick={() => setActive(item.path)}
              >
                <div className="mr-3">{item.icon}</div>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;