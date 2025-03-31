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
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="min-h-screen bg-[#F8F2DE]">
      <ToastContainer />
      <Navbar />
      <div className="flex min-h-screen pt-8">
        <SidePanel />
        <main className="flex-1 p-6 pt-20 ">
          <Routes>

            {/* Admin Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/doctors-list" element={<DoctorsList />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />

            {/* Doctor Routes */}
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} /> 
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
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