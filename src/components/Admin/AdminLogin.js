import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin/login", {
        email,
        password,
      });
      const adminData = response.data;
      //setAdminId(adminData.id);
      localStorage.setItem("adminId", adminData.id); // Store adminId in local storage
      alert("Login Successful!");
      // Save token and redirect to Admin Dashboard
      navigate(`/admin/dashboard/${adminData.id}`);
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
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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

export default AdminLogin;
