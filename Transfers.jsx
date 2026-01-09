// src/pages/Transfer.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";


const BASES = ["Base Alpha", "Base Bravo", "Base Charlie", "Base Delta"];
const EQUIPMENT_TYPES = [
  "Rifle",
  "Ammunition",
  "Vehicle",
  "Tank",
  "Drone",
  "Communication Equipment",
];

const Transfer = () => {
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [transfers, setTransfers] = useState([]);
  const [message, setMessage] = useState("");

  
  const fetchTransfers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/transfers");
      setTransfers(res.data);
    } catch (err) {
      console.error("Error fetching transfers:", err);
      setMessage("Failed to fetch transfer history");
    }
  };

 
  useEffect(() => {
    fetchTransfers();
  }, []);

  
  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!fromBase || !toBase || !equipmentType || !quantity || !transferDate) {
      setMessage("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/transfers", {
        fromBase,
        toBase,
        equipmentType,
        quantity,
        transferDate,
      });

      setMessage("Transfer recorded successfully!");
      
      fetchTransfers();

      setFromBase("");
      setToBase("");
      setEquipmentType("");
      setQuantity("");
      setTransferDate("");
    } catch (err) {
      console.error("Transfer error:", err);
      setMessage(err.response?.data?.error || "Transfer failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Asset Transfers</h2>

      <form onSubmit={handleTransfer} style={styles.form}>
        {}
        <select
          value={fromBase}
          onChange={(e) => setFromBase(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select From Base</option>
          {BASES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {}
        <select
          value={toBase}
          onChange={(e) => setToBase(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select To Base</option>
          {BASES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {}
        <select
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Select Equipment Type</option>
          {EQUIPMENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {}
        <input
          type="number"
          placeholder="Quantity"
          min={0}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || "")}
          required
          style={styles.input}
        />

        {}
        <input
          type="date"
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Record Transfer</button>
      </form>

      {}
      {message && (
        <p style={{ color: message.includes("success") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {}
      <h3>Transfer History</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>From Base</th>
            <th>To Base</th>
            <th>Equipment Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transfers.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No transfers found
              </td>
            </tr>
          ) : (
            transfers.map((t) => (
              <tr key={t.id}>
                <td>{t.fromBase}</td>
                <td>{t.toBase}</td>
                <td>{t.equipmentType}</td>
                <td>{t.quantity}</td>
                <td>{t.transferDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};


const styles = {
  container: { padding: "20px" },
  form: { display: "flex", flexDirection: "column", marginBottom: "20px", maxWidth: "400px" },
  input: { marginBottom: "10px", padding: "8px", fontSize: "14px" },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
};

export default Transfer;
