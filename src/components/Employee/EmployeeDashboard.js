import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function EmployeeDashboard() {
  const { employeeCode } = useParams(); // Retrieve employeeCode from URL parameter
  const [employeeData, setEmployeeData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/employee/${employeeCode}`)
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [employeeCode]);

  const handleLogout = () => {
    // Remove adminId from local storage and redirect to home page
    localStorage.removeItem("employeeCode");
    navigate("/", { replace: true }); // Use navigate to redirect to the home page
    alert("You have been logged out successfully!");
  };


  return (
    <div>
      <h1>Employee Dashboard</h1>
      <p>Welcome, {employeeData.firstName}!</p>
      <h2>Employee Details:</h2>
      <table>
        <tbody>
          <tr>
            <td>Employee Code:</td>
            <td>{employeeData.employeeCode}</td>
          </tr>
          <tr>
            <td>First Name:</td>
            <td>{employeeData.firstName}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{employeeData.lastName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{employeeData.email}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{employeeData.city}</td>
          </tr>
          <tr>
            <td>age:</td>
            <td>{employeeData.age}</td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default EmployeeDashboard;