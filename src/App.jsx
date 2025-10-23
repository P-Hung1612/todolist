import { useState, useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";
import TodoInput from "./components/ToDoInput";
import TodoItem from "./components/ToDoItem";
import TodoFilter from "./components/ToDoFilter";
import { useTodoStore } from "./store/useTodoStore";
import { io } from "socket.io-client";
import { useAuthStore } from "./store/useAuthStore";
import AuthForm from "./components/AuthForm";
import "./App.css";

function App() {
    const { user, logout } = useAuthStore();
    const [dark, setDark] = useState(false);
    const socketRef = useRef(null);

    const {
        todos,
        filteredTodos,
        fetchTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        filter,
        setFilter,
        search,
        setSearch,
        loading,
    } = useTodoStore();

    useEffect(() => {
        if (user) fetchTodos();
    }, [user, fetchTodos]);

    if (!user) return <AuthForm />;

    return (
        <div className={dark ? "app dark" : "app"}>
            <Toaster position="top-center" />
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-blue-500 mb-4 text-center">📝 Todo List</h1>
                <button onClick={logout} className="text-sm text-red-500 hover:underline">
                    Đăng xuất
                </button>
                <button
                    className="mb-[20px] ml-3 px-3 py-1 text-sm font-medium rounded-lg 
               bg-blue-100 hover:bg-blue-200 
               text-blue-600 transition-all"
                    onClick={() => setDark(!dark)}
                >
                    {dark ? "☀️ Sáng" : "🌙 Tối"}
                </button>
            </div>


            <TodoInput onAdd={addTodo} />
            <TodoFilter
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
            />

            {loading && <p className="text-gray-400 italic text-center">Đang tải dữ liệu...</p>}

            <ul className="overflow-y-auto max-h-[400px]">
                {filteredTodos().length === 0 ? (
                    <p className="text-gray-500 italic text-center mt-4">
                        Không có công việc nào 🎉
                    </p>
                ) : (
                    filteredTodos().map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onToggle={() => toggleTodo(todo._id, todo.done)}
                            onDelete={() => deleteTodo(todo._id)}
                            onUpdate={updateTodo}
                        />
                    ))
                )}
            </ul>

            <div className="text-sm text-gray-500 mt-4 text-center">
                Tổng: {todos.length} | Hoàn thành: {todos.filter((t) => t.done).length}
            </div>
        </div>
    );
}

export default App;
