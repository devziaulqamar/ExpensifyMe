import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

export default function Categories() {
    const { categories, setCategories } = useTransactions();
    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            return alert("Please enter a category name");
        }

        if (categories.includes(newCategory.trim())) {
            return alert("This category already exists");
        }

        setCategories([...categories, newCategory.trim()]);
        setNewCategory("");
    };

    const handleDeleteCategory = (category) => {
        if (categories.length <= 1) {
            return alert("You must have at least one category");
        }

        if (window.confirm(`Are you sure you want to delete "${category}"?`)) {
            setCategories(categories.filter((c) => c !== category));
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {/* Add New Category */}
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold mb-3">Add New Category</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter category name"
                        className="flex-1 border rounded p-2"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                    />
                    <button
                        onClick={handleAddCategory}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Categories List */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">
                    All Categories ({categories.length})
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {categories.map((category) => (
                        <li
                            key={category}
                            className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
                        >
                            <span className="font-medium">{category}</span>
                            <button
                                onClick={() => handleDeleteCategory(category)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

