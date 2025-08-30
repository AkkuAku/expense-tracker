
// ViewExpenses.tsx
import MapUpdater from "./MapUpdater";

import { useEffect, useState } from "react";
import { Expense } from "../types";
import "./ViewExpenses.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const customIcon = L.divIcon({
  html: `<div class="custom-marker"></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});



export default function ViewExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(stored);
  }, []);

  const filtered = selectedDate
    ? expenses.filter((exp) => {
        if (!exp.date) return false;
        return exp.date.startsWith(selectedDate); // YYYY-MM-DD
      })
    : expenses;

  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expenses-layout">
  {/* Панель карточек слева */}
  <div className="sidebar">
    <h2 className="title">Expenses</h2>

    <div className="filter">
      <label>Select Day: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>

    <div className="cards">
      {filtered.length === 0 ? (
        <p>No expenses found {selectedDate ? `for ${selectedDate}` : ""}.</p>
      ) : (
        filtered.map((exp) => (
          <div
            key={exp.id}
            className={`card ${selectedExpense?.id === exp.id ? "active" : ""}`}
            onClick={() => setSelectedExpense(exp)}
          >
            <div className="card-header">
              <span className="amount">${exp.amount}</span>
              <span className="category">{exp.category}</span>
            </div>
            <div className="card-body">
              <p className="note">{exp.note || "No note"}</p>
              <p className="date">
                {exp.date ? new Date(exp.date).toLocaleString() : "N/A"}
              </p>
              <p className="location">
                {exp.location
                  ? `${exp.location.lat.toFixed(4)}, ${exp.location.lon.toFixed(4)}`
                  : "N/A"}
              </p>
            </div>
          </div>
        ))
      )}

      <div className="summary">
        Total spent: <b>${total}</b> | Transactions:{" "}
        <b>{filtered.length}</b>
      </div>
    </div>
  </div>

  {/* Карта справа на весь экран */}
  <div className="map-container">
    {selectedExpense && selectedExpense.location ? (
      <MapContainer
        center={[selectedExpense.location.lat, selectedExpense.location.lon]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        <Marker position={[selectedExpense.location.lat, selectedExpense.location.lon]} icon={customIcon}>
          <Popup>
            {selectedExpense.category} – ${selectedExpense.amount}
          </Popup>
        </Marker>

        <MapUpdater expense={selectedExpense} />
      </MapContainer>
    ) : (
      <p className="placeholder">Select an expense to see location</p>
    )}
  </div>
</div>


        
    
  );
}
