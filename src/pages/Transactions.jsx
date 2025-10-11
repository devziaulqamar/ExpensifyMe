import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
    const [editingTransaction, setEditingTransaction] = useState(null);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <TransactionForm
                editTransaction={editingTransaction}
                onCancelEdit={() => setEditingTransaction(null)}
            />
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">All Transactions</h2>
                <TransactionList onEdit={setEditingTransaction} />
            </div>
        </div>
    );
}
