// src/pages/Assignments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BASES = ["Base Alpha", "Base Bravo", "Base Charlie", "Base Delta"];
const EQUIPMENT_TYPES = ["Rifle", "Ammunition", "Vehicle", "Tank", "Drone", "Communication Equipment"];

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [base, setBase] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedDate, setAssignedDate] = useState("");
  const [message, setMessage] = useState("");
  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/assignments");
      setAssignments(res.data);
      setMessage("");
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setMessage("Failed to load assignments.");
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  
  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!base || !equipmentType || !quantity || !assignedTo || !assignedDate) {
      setMessage("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/assignments", {
        base,
        equipmentType,
        quantity: Number(quantity),
        assignedTo,
        assignedDate,
      });

      setMessage("Assignment added successfully!");
      setBase("");
      setEquipmentType("");
      setQuantity("");
      setAssignedTo("");
      setAssignedDate("");
      fetchAssignments();
    } catch (err) {
      console.error("Error adding assignment:", err);
      setMessage(
        err.response?.data?.message || "Failed to add assignment. Check server logs."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Assignments</h2>

      {message && (
        <p style={{ color: message.includes("successfully") ? "green" : "red" }}>{message}</p>
      )}

      <form onSubmit={handleAddAssignment} style={styles.form}>
        {}
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Select Base</option>
          {BASES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {}
        <select
          value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)}
          style={styles.input}
          required
        >
          <option value="">Select Equipment</option>
          {EQUIPMENT_TYPES.map((eq) => (
            <option key={eq} value={eq}>{eq}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={styles.input}
          min={1}
          required
        />
        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="date"
          value={assignedDate}
          onChange={(e) => setAssignedDate(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Add Assignment</button>
      </form>

      {}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Base</th>
            <th>Equipment Type</th>
            <th>Quantity</th>
            <th>Assigned To</th>
            <th>Assigned Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No assignments found</td>
            </tr>
          ) : (
            assignments.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.base}</td>
                <td>{a.equipmentType}</td>
                <td>{a.quantity}</td>
                <td>{a.assignedTo}</td>
                <td>{a.assignedDate}</td>
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
  form: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" },
  input: { padding: "8px", fontSize: "14px", flex: "1 1 150px" },
  button: {
    padding: "10px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "20px" },
};

export default Assignments;
