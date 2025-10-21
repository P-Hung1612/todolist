import { useState, useEffect } from "react";
import TodoInput from "./components/ToDoInput";
import TodoItem from "./components/ToDoItem";
import "./App.css";

function App() {
    // Lấy dữ liệu từ localStorage khi app load
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    // Mỗi khi todos thay đổi → lưu lại localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        if (text.trim() !== "") {
            setTodos([...todos, { id: Date.now(), text, done: false }]);
        }
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="app">
            <h1 className="text-3xl font-bold text-blue-500">📝 Todo List</h1>
            <TodoInput onAdd={addTodo} />
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
