import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Add Expense</Link>
        <Link to="/expenses">View Expenses</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddExpense />} />
        <Route path="/expenses" element={<ViewExpenses />} />
      </Routes>
    </Router>
  );
}

export default App;

