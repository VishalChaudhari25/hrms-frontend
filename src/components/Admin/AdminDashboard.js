import React, { useState, useEffect, } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const { adminId } = useParams(); // Retrieve adminId from URL parameter
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`http://localhost:8080/admin/${adminId}/employees`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [adminId]);

  const handleLogout = () => {
    // Remove adminId from local storage and redirect to home page
    localStorage.removeItem("adminId");
    navigate("/", { replace: true }); // Use navigate to redirect to the home page
  };


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <Link to={`/employee/register/${adminId}`}>Register New Employee</Link>
      <br></br>
      <button onClick={handleLogout}>Logout</button>
      <h2>Employees:</h2>
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeCode}>
                <td>{employee.employeeCode}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <Link to={`/employee/${employee.employeeCode}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
}

export default AdminDashboard;
