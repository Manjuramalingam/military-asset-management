// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!role) {
      setMessage("Please select a role.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        { fullName, email, password, role },
        { headers: { "Content-Type": "application/json" } }
      );


      setMessage(res.data?.message || "Registration successful!");

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {

      const errMsg =
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.error || "Registration failed";
      setMessage(errMsg);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Military Asset Management System</h2>
      <h3>Register</h3>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="BASE_COMMANDER">Base Commander</option>
          <option value="LOGISTICS_OFFICER">Logistics Officer</option>
        </select>

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>

      {}
      <p style={{ color: "red" }}>{String(message)}</p>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Register;
