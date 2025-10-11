import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTransactions } from "../context/TransactionContext";

const COLORS = ["#22c55e", "#ef4444"]; // green = income, red = expense

export default function Chart() {
    const { transactions } = useTransactions();

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const data = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense },
    ];

    if (transactions.length === 0) {
        return (
            <p className="text-gray-500 text-center py-8">No data to display yet</p>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow mt-4">
            <h2 className="text-lg font-semibold mb-4 text-center">Income vs Expense</h2>
            <div className="w-full h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
