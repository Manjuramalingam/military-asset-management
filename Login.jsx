// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      
      const user = res.data;

      if (!user) {
        setMessage("Invalid credentials");
        return;
      }

      switch (user.role) {
        case "ADMIN":
          navigate("/admindashboard");
          break;
        case "BASE_COMMANDER":
          navigate("/basedashboard");
          break;
        case "LOGISTICS_OFFICER":
          navigate("/logisticsdashboard");
          break;
        default:
          setMessage("Unknown role");
      }
    } catch (err) {
      
      setMessage(
        typeof err.response?.data === "string"
          ? err.response.data
          : err.response?.data?.error || "Login failed"
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Military Asset Management System</h2>
      <h3>Login</h3>

      <form onSubmit={handleLogin} style={styles.form}>
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

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <p style={{ color: "red" }}>{String(message)}</p>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
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

export default Login;
