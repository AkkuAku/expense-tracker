import { useState, useEffect } from "react";
import { Expense, Location } from "../types";
import "./AddExpense.css";

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
        () => {
          fetch("https://ipinfo.io/json?token=6d42da01ba666b")
            .then((res) => res.json())
            .then((data) => {
              if (data.loc) {
                const [lat, lon] = data.loc.split(",");
                setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
                setStatus(`Approximate location: ${lat}, ${lon}`);
              } else {
                setStatus("Failed to get location from IP.");
              }
            })
            .catch(() => setStatus("Failed to get location."));
        }
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
      date: new Date().toISOString(),
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
    <div className="add-expense-container">
      <h2>Add Expense</h2>
      <form className="add-expense-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <input
          type="text"
          placeholder="Short Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>
        <button type="submit">Save Expense</button>
      </form>
      <p className="add-expense-status">{status}</p>
    </div>
  );
}
