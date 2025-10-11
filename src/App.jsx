import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import { TransactionProvider } from "./context/TransactionContext";

export default function App() {
  return (
    <TransactionProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Navbar */}
          <nav className="bg-white shadow p-4 flex justify-around text-blue-600 font-medium">
            <Link to="/">Dashboard</Link>
            <Link to="/transactions">Transactions</Link>
            <Link to="/categories">Categories</Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </Router>
    </TransactionProvider>
  );
}
