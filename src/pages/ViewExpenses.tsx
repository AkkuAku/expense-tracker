

import { useEffect, useState } from "react";
import { Expense } from "../types";
import "./ViewExpenses.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapUpdater from "./MapUpdater";

const customIcon = L.divIcon({
  html: `<div class="custom-marker"></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10],
});

export default function ViewExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0] 
  );
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(stored);
  }, []);

  // фильтр по выбранному дню
  const filtered = expenses.filter((exp) =>
    exp.date ? exp.date.startsWith(selectedDate) : false
  );

  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);

  // кнопки переключения дней
  const changeDay = (offset: number) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + offset);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  return (
    <div className="expenses-layout">
      <div className="sidebar">
        <h2 className="title">Expenses</h2>

       <div className="day-navigator-card">
  <div className="day-navigator">
    <button onClick={() => changeDay(-1)}>⬅</button>
    <span>{selectedDate}</span>
    <button onClick={() => changeDay(1)}>➡</button>
  </div>
  
  
</div>




        <div className="summary-card">
          <p>
            Total spent: <b>${total}</b>
          </p>
          <p>
            Transactions: <b>{filtered.length}</b>
          </p>
        </div>

        <div className="cards">
          {filtered.length === 0 ? (
            <p>No expenses found for {selectedDate}.</p>
          ) : (
            filtered.map((exp) => (
              <div
                key={exp.id}
                className={`card ${
                  selectedExpense?.id === exp.id ? "active" : ""
                }`}
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
                      ? `${exp.location.lat.toFixed(4)}, ${exp.location.lon.toFixed(
                          4
                        )}`
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="map-container">
        {selectedExpense && selectedExpense.location ? (
          <MapContainer
            center={[
              selectedExpense.location.lat,
              selectedExpense.location.lon,
            ]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker
              position={[
                selectedExpense.location.lat,
                selectedExpense.location.lon,
              ]}
              icon={customIcon}
            >
              <Popup>
                <div className="custom-popup">
                  <p className="amount">${selectedExpense.amount}</p>
                  <p className="category1">{selectedExpense.category}</p>
                  <p className="date">
                    {selectedExpense.date
                      ? new Date(selectedExpense.date).toLocaleString()
                      : "N/A"}
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${selectedExpense.location.lat},${selectedExpense.location.lon}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location"
                  >
                    {selectedExpense.location.lat.toFixed(4)},{" "}
                    {selectedExpense.location.lon.toFixed(4)}
                  </a>
                </div>
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
