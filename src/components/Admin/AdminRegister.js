import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const checkEmailExists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/check-email/${admin.email}`
      );
      setEmailExists(response.data);
    } catch (error) {
      console.error("Error checking email existence:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkEmailExists();
    try {
      if (emailExists) {
        setError("Email already exists");
        return;
      }
      console.log("Submitting admin data:", admin); // Debugging line
      const response = await axios.post(
        "http://localhost:8080/admin/register",
        admin
      );
      console.log("Response:", response); // Debugging line
      if (response.status === 201) {
        alert("Admin registered successfully");
        navigate("/admin/login");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("There was an error registering the admin!", error);
      setError(error.response?.data || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
          {emailExists && <p style={{ color: "red" }}>Email already exists</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminRegister;