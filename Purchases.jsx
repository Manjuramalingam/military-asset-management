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

const Purchases = () => {
  const [base, setBase] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [message, setMessage] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [filters, setFilters] = useState({ base: "", equipmentType: "", date: "" });
  const [showHistory, setShowHistory] = useState(false);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/purchases");
      // Normalize fields
      const normalized = res.data.map((p) => ({
        base: p.base,
        equipmentType: p.equipmentType || p.equipment_type,
        quantity: p.quantity,
        purchaseDate: (p.purchaseDate || p.purchase_date).split("T")[0],
      }));
      setPurchases(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!base || !equipmentType || !quantity || !purchaseDate) {
      setMessage("All fields are required!");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8080/api/purchases",
        { base, equipmentType, quantity: Number(quantity), purchaseDate },
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Purchase recorded successfully!");
      setBase("");
      setEquipmentType("");
      setQuantity("");
      setPurchaseDate("");
      fetchPurchases();
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to record purchase");
    }
  };

  const filteredPurchases = purchases.filter((p) => {
    return (
      (!filters.base || p.base === filters.base) &&
      (!filters.equipmentType || p.equipmentType === filters.equipmentType) &&
      (!filters.date || p.purchaseDate === filters.date)
    );
  });

  return (
    <div style={styles.container}>
      <h2>Record Purchase</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select value={base} onChange={(e) => setBase(e.target.value)} style={styles.input}>
          <option value="">Select Base</option>
          {BASES.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} style={styles.input}>
          <option value="">Select Equipment Type</option>
          {EQUIPMENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} style={styles.input} />
        <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.button}>Record Purchase</button>
      </form>

      <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>

      <h3>Historical Purchases</h3>
      <div style={styles.filters}>
        <select value={filters.base} onChange={(e) => setFilters({ ...filters, base: e.target.value })} style={styles.inputSmall}>
          <option value="">All Bases</option>
          {BASES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>

        <select value={filters.equipmentType} onChange={(e) => setFilters({ ...filters, equipmentType: e.target.value })} style={styles.inputSmall}>
          <option value="">All Equipment</option>
          {EQUIPMENT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>

        <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} style={styles.inputSmall} />

        <button style={{ ...styles.button, padding: "6px 12px", marginLeft: "5px" }} onClick={() => setShowHistory(true)}>View History</button>
      </div>

      {showHistory && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Base</th>
              <th>Equipment Type</th>
              <th>Quantity</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No purchases found</td>
              </tr>
            ) : (
              filteredPurchases.map((p, index) => (
                <tr key={index}>
                  <td>{p.base}</td>
                  <td>{p.equipmentType}</td>
                  <td>{p.quantity}</td>
                  <td>{p.purchaseDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px" },
  form: { display: "flex", flexDirection: "column", maxWidth: "400px", marginBottom: "20px" },
  input: { marginBottom: "10px", padding: "8px", fontSize: "16px" },
  inputSmall: { marginRight: "10px", marginBottom: "10px", padding: "6px", fontSize: "14px" },
  button: { padding: "10px", fontSize: "16px", cursor: "pointer", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" },
  filters: { display: "flex", marginBottom: "10px", flexWrap: "wrap", alignItems: "center" },
  table: { width: "100%", borderCollapse: "collapse" },
};

export default Purchases;
