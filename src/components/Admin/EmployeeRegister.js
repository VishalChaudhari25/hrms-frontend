import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EmployeeRegister() {
  const { adminId } = useParams(); // Get adminId from URL parameter
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (
      !employeeCode ||
      !password ||
      !firstName ||
      !lastName ||
      !email ||
      !city ||
      !age
    ) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/employee/register/${adminId}`, // Update URL to include adminId
        {
          employeeCode,
          password,
          firstName,
          lastName,
          email,
          city,
          age,
        }
      );
      console.log("Employee registered:", response.data);
      setError(null);
      setSuccess("Employee registered successfully!");
    } catch (error) {
      setError(error.response.data); // Display the error message from the backend
    }
  };

  return (
    <div>
      <h2>Register Employee</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />

        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default EmployeeRegister;
