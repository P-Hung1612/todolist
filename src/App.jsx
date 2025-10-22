import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./components/ToDoInput";
import TodoItem from "./components/ToDoItem";
import TodoFilter from "./components/ToDoFilter";
import "./App.css";

const API_URL = "/api/todos";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get(API_URL).then((res) => setTodos(res.data));
    }, []);

    const addTodo = async (text) => {
        const res = await axios.post(API_URL, { text });
        setTodos((prev) => [res.data, ...prev]);
    };

    const toggleTodo = async (id, done) => {
        const res = await axios.patch(`${API_URL}/${id}`, { done: !done });
        setTodos((prev) =>
            prev.map((t) => (t._id === id ? res.data : t))
        );
    };

    const updateTodo = async (id, updates) => {
        const res = await axios.patch(`${API_URL}/${id}`, updates);
        setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTodos((prev) => prev.filter((t) => t._id !== id));
    };

    return (
        <div className="app">
            <h1>📝 Todo List</h1>
            <TodoInput onAdd={addTodo} />
            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={() => toggleTodo(todo._id, todo.done)}
                        onDelete={() => deleteTodo(todo._id)}
                        onUpdate={(id, updates) => updateTodo(id, updates)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
