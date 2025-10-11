import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

export default function Expenses() {
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem("expenses");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (expense) => setExpenses([expense, ...expenses]);
    const deleteExpense = (id) =>
        setExpenses(expenses.filter((e) => e.id !== id));

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 mt-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Your Expenses</h2>
            <ExpenseForm onAdd={addExpense} />
            <ExpenseSummary expenses={expenses} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
    );
}
