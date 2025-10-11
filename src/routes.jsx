import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Expenses from "./pages/Expenses";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
        </Routes>
    );
}
