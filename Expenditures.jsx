import React, { useEffect, useState } from "react";
import axios from "axios";

const Expenditures = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [form, setForm] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
    reason: "",
    expenditureDate: ""
  });

  const bases = [
    "ALPHA",
    "BRAVO",
    "CHARLIE",
    "DELTA",
    "ECHO"
  ];

  const equipments = ["Rifle", "Tank", "Ammunition", "Vehicle"];

  const fetchExpenditures = async () => {
    const res = await axios.get("http://localhost:8080/api/expenditures");
    setExpenditures(res.data);
  };

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/expenditures", {
        base: form.base,
        equipmentType: form.equipmentType,
        quantity: parseInt(form.quantity),
        reason: form.reason,
        expenditureDate: form.expenditureDate
      });

      setForm({
        base: "",
        equipmentType: "",
        quantity: "",
        reason: "",
        expenditureDate: ""
      });

      fetchExpenditures();
    } catch (err) {
      console.error("Error adding expenditure", err);
      alert("Failed to add expenditure");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expenditures</h2>

      <form onSubmit={handleSubmit}>
        {}
        <select name="base" value={form.base} onChange={handleChange} required>
          <option value="">Select Base</option>
          {bases.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        {}
        <select
          name="equipmentType"
          value={form.equipmentType}
          onChange={handleChange}
          required
        >
          <option value="">Select Equipment</option>
          {equipments.map(e => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        {}
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />

        {}
        <input
          type="text"
          name="reason"
          placeholder="Reason for expenditure"
          value={form.reason}
          onChange={handleChange}
        />

        {}
        <input
          type="date"
          name="expenditureDate"
          value={form.expenditureDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Expenditure</button>
      </form>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Base</th>
            <th>Equipment</th>
            <th>Quantity</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenditures.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.base}</td>
              <td>{e.equipmentType}</td>
              <td>{e.quantity}</td>
              <td>{e.reason}</td>
              <td>{e.expenditureDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenditures;
