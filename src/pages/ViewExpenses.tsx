import { useEffect, useState } from "react";
import { Expense } from "../types";

export default function ViewExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(stored);
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Amount</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Note</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Category</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Location</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{exp.amount}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{exp.note}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{exp.category}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{exp.date}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {exp.location
                    ? `${exp.location.lat.toFixed(4)}, ${exp.location.lon.toFixed(4)}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
