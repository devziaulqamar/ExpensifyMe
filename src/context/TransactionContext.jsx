import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem("categories");
        return saved
            ? JSON.parse(saved)
            : ["Food", "Rent", "Salary", "Shopping", "Other"];
    });

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem("categories", JSON.stringify(categories));
    }, [categories]);

    const addTransaction = (transaction) => {
        setTransactions([transaction, ...transactions]);
    };

    const updateTransaction = (id, updated) => {
        setTransactions(
            transactions.map((t) => (t.id === id ? { ...t, ...updated } : t))
        );
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                categories,
                addTransaction,
                updateTransaction,
                deleteTransaction,
                setCategories,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransactions = () => useContext(TransactionContext);
