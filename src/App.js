import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminRegister from './components/Admin/AdminRegister';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard.js';
import EmployeeRegister from './components/Admin/EmployeeRegister';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import EmployeeEdit from './components/Admin/EmployeeEdit';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/:adminId" element={<AdminDashboard />} />
        <Route path="/employee/register/:adminId" element={<EmployeeRegister />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/dashboard/:employeeCode" element={<EmployeeDashboard />} />
        <Route path="admin/:adminId/employees/:employeeCode" element={<EmployeeEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
// {/* <Route path="/admin/register-employee" element={<RegisterEmployee />} /> */}