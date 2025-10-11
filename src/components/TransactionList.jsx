import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionList({ onEdit }) {
    const { transactions, deleteTransaction } = useTransactions();

    if (transactions.length === 0)
        return <p className="text-gray-500 text-center">No transactions yet.</p>;

    return (
        <ul className="divide-y">
            {transactions.map((t) => (
                <li key={t.id} className="flex justify-between py-2">
                    <div className="flex-1">
                        <p className="font-medium">{t.title}</p>
                        <p className="text-sm text-gray-500">
                            {t.category} | {t.date}
                        </p>
                        {t.notes && (
                            <p className="text-sm text-gray-400 mt-1">{t.notes}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <p
                            className={`font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {t.type === "income" ? "+" : "-"}PKR {t.amount.toFixed(2)}
                        </p>
                        <button
                            onClick={() => onEdit && onEdit(t)}
                            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteTransaction(t.id)}
                            className="text-gray-400 hover:text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
