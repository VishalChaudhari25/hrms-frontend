import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeLogin() {
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/employee/login",
        {
          employeeCode,
          password,
        }
      );
      const EmployeeData = response.data;
      if (EmployeeData) {
        localStorage.setItem("employeeCode", employeeCode); // Store employeeCode in local storage
        setError(null); // Clear the error state
        alert("Login Successful!"); // Add an alert after successful login
        navigate(`/employee/dashboard/${employeeCode}`);
      } else {
        setError("Invalid Credentials!!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
        alert(error.response.data);
      } else {
        setError("Invalid Credentials!!");
      }
    }
  };

  return (
    <div>
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={employeeCode}
          onChange={(e) => setEmployeeCode(e.target.value)}
          placeholder="Employee Code"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default EmployeeLogin;
