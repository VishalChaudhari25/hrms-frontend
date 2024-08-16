import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div>
      <h1>Welcome to the HR Management System</h1>
      <div>
        <h2>Admin</h2>
        <Link to="/admin/register">Admin Register</Link>
        <br />
        <Link to="/admin/login">Admin Login</Link>
      </div>
      <div>
        <h2>Employee</h2>
        <Link to="/employee/login">Employee Login</Link>
      </div>
    </div>
  );
};

export default Home;