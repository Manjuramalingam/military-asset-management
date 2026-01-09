// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Purchases from "./Purchases";
import Transfers from "./Transfers";
import Assignments from "./Assignments";
import Expenditures from "./Expenditures";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    openingBalance: 0,
    closingBalance: 0,
    netMovement: 0,
    assignedAssets: 0,
    expendedAssets: 0,
    purchases: 0,
    transferIn: 0,
    transferOut: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/admin");
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching admin metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleNetMovementClick = () => {
    alert(
      `Net Movement Details:\n` +
        `Purchases: ${metrics.purchases}\n` +
        `Transfer In: ${metrics.transferIn}\n` +
        `Transfer Out: ${metrics.transferOut}`
    );
  };

  if (loading) return <p>Loading metrics...</p>;

  return (
    <div style={styles.dashboardContainer}>
      {}
      <div style={styles.sidebar}>
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/admindashboard/purchases" style={styles.link}>
            Purchases
          </Link>
          <Link to="/admindashboard/transfers" style={styles.link}>
            Transfers
          </Link>
          <Link to="/admindashboard/assignments" style={styles.link}>
            Assignments
          </Link>
          <Link to="/admindashboard/expenditures" style={styles.link}>
            Expenditures
          </Link>
        </nav>
      </div>

      {}
      <div style={styles.main}>
        <h2>Dashboard Metrics</h2>

        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>Opening Balance</h3>
            <p>{metrics.openingBalance}</p>
          </div>

          <div style={styles.card}>
            <h3>Closing Balance</h3>
            <p>{metrics.closingBalance}</p>
          </div>

          <div style={styles.card} onClick={handleNetMovementClick}>
            <h3 style={{ cursor: "pointer" }}>Net Movement</h3>
            <p>{metrics.netMovement}</p>
          </div>

          <div style={styles.card}>
            <h3>Assigned Assets</h3>
            <p>{metrics.assignedAssets}</p>
          </div>

          <div style={styles.card}>
            <h3>Expended Assets</h3>
            <p>{metrics.expendedAssets}</p>
          </div>
        </div>

        {}
        <Routes>
          <Route path="/" element={<Navigate to="purchases" />} />
          <Route path="purchases" element={<Purchases />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="expenditures" element={<Expenditures />} />
        </Routes>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "200px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRight: "1px solid #ccc",
  },
  link: {
    display: "block",
    margin: "10px 0",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  card: {
    flex: "1 1 150px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
  },
};

export default AdminDashboard;
