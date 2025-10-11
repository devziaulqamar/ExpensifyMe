import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="text-center mt-16">
            <h2 className="text-3xl font-semibold mb-4">Welcome to Expense Tracker</h2>
            <p className="text-gray-600 mb-8">
                Keep track of your daily expenses easily and efficiently.
            </p>
            <Link
                to="/expenses"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Go to Expenses
            </Link>
        </div>
    );
}
