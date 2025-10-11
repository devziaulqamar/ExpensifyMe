import { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionForm({ editTransaction, onCancelEdit }) {
    const { addTransaction, updateTransaction, categories } = useTransactions();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState(categories[0] || "");
    const [date, setDate] = useState("");
    const [notes, setNotes] = useState("");

    // Populate form if editing
    useEffect(() => {
        if (editTransaction) {
            setTitle(editTransaction.title);
            setAmount(editTransaction.amount.toString());
            setType(editTransaction.type);
            setCategory(editTransaction.category);
            setDate(editTransaction.date);
            setNotes(editTransaction.notes || "");
        }
    }, [editTransaction]);

    const handleSubmit = () => {
        if (!title || !amount || !date)
            return alert("Please fill all required fields.");

        const transactionData = {
            title,
            amount: parseFloat(amount),
            type,
            category,
            date,
            notes,
        };

        if (editTransaction) {
            // Update existing transaction
            updateTransaction(editTransaction.id, transactionData);
            onCancelEdit && onCancelEdit();
        } else {
            // Add new transaction
            addTransaction({
                id: Date.now(),
                ...transactionData,
            });
        }

        // Clear form
        setTitle("");
        setAmount("");
        setType("expense");
        setCategory(categories[0] || "");
        setDate("");
        setNotes("");
    };

    const handleCancel = () => {
        setTitle("");
        setAmount("");
        setType("expense");
        setCategory(categories[0] || "");
        setDate("");
        setNotes("");
        onCancelEdit && onCancelEdit();
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-semibold mb-2">
                {editTransaction ? "Edit Transaction" : "Add Transaction"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                    placeholder="Title"
                    className="border rounded p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="border rounded p-2"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    className="border rounded p-2"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <select
                    className="border rounded p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((c) => (
                        <option key={c}>{c}</option>
                    ))}
                </select>
                <input
                    type="date"
                    className="border rounded p-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    placeholder="Notes (optional)"
                    className="border rounded p-2 col-span-full"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div className="flex gap-2 mt-3">
                <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                >
                    {editTransaction ? "Update" : "Add"}
                </button>
                {editTransaction && (
                    <button
                        onClick={handleCancel}
                        className="px-4 bg-gray-300 text-gray-700 rounded p-2 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}
