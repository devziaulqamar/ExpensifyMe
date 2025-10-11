import { useTransactions } from "../context/TransactionContext";
import SummaryCard from "../components/SummaryCard";
import Chart from "../components/Chart";

export default function Dashboard() {
    const { transactions } = useTransactions();

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Get recent 5 transactions
    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <SummaryCard title="Income" value={totalIncome} color="green" />
                <SummaryCard title="Expenses" value={totalExpense} color="red" />
                <SummaryCard title="Balance" value={balance} color="blue" />
            </div>
            <Chart />

            {/* Recent Transactions */}
            <div className="bg-white p-4 rounded-xl shadow mt-4">
                <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                {recentTransactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No transactions yet</p>
                ) : (
                    <ul className="divide-y">
                        {recentTransactions.map((t) => (
                            <li key={t.id} className="flex justify-between py-3">
                                <div>
                                    <p className="font-medium">{t.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {t.category} • {t.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`font-semibold ${t.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {t.type === "income" ? "+" : "-"}PKR {t.amount.toFixed(2)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
