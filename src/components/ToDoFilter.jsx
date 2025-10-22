// components/TodoFilter.jsx
import React from "react";

function TodoFilter({ filter, setFilter, search, setSearch }) {
    const filters = [
        { key: "all", label: "Tất cả" },
        { key: "active", label: "Chưa hoàn thành" },
        { key: "done", label: "Hoàn thành" },
    ];

    return (
        <div className="flex flex-col sm:flex-row flex-wrap w-full gap-3 mb-4">
            {/* Ô tìm kiếm */}
            <input
                type="text"
                placeholder="🔍 Tìm công việc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* Các nút lọc */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {filters.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`px-3 py-2 rounded-lg font-medium transition-all ${filter === key
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-100 hover:bg-blue-50"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TodoFilter;
