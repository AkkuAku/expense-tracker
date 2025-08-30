import { useState, useEffect } from "react";
import { Expense, Location } from "../types";

export default function AddExpense() {
  const [amount, setAmount] = useState<number>(0);
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState<Location | undefined>();
  const [status, setStatus] = useState("Getting location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
          setStatus(
            `Location: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
          );
        },
        () => setStatus("Failed to get location.")
      );
    } else {
      setStatus("Geolocation not supported.");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount,
      note,
      category,
      location,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("expenses") || "[]");
    existing.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(existing));

    alert("Expense saved!");
    setAmount(0);
    setNote("");
    setCategory("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Short Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ display: "block", width: "100%", margin: "10px 0", padding: "8px" }}
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <button type="submit" style={{ padding: "10px", width: "100%" }}>Save Expense</button>
      </form>
      <p>{status}</p>
    </div>
  );
}