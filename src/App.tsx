import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import "./Navbar.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-logo">Expense Tracker</div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Add Expense</Link>
          </li>
          <li>
            <Link to="/expenses">View Expenses</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<AddExpense />} />
        <Route path="/expenses" element={<ViewExpenses />} />
      </Routes>
    </Router>
  );
}

export default App;

