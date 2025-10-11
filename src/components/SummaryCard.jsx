export default function SummaryCard({ title, value, color }) {
    const colors = {
        green: "text-green-600",
        red: "text-red-600",
        blue: "text-blue-600",
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-600 text-sm">{title}</p>
            <p className={`text-2xl font-bold ${colors[color]}`}>
                PKR {value.toFixed(2)}
            </p>
        </div>
    );
}
