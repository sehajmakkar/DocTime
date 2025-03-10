import React, { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import { AdminContext } from './context/AdminContext';
import Navbar from './pages/Navbar';
import SidePanel from './components/SidePanel';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="min-h-screen bg-[#F8F2DE]">
      <ToastContainer />
      <Navbar />
      <div className="flex min-h-screen pt-8">
        <SidePanel />
        <main className="flex-1 p-6 pt-20 ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/doctors-list" element={<DoctorsList />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;