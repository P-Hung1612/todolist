import { useState } from "react";

function TodoInput({ onAdd }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(text);
        setText("");
    };

    return (
        <form onSubmit={handleSubmit} className="todo-input">
            <input
                type="text"
                placeholder="Nhập việc cần làm..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="transition-all focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="transition-all duration-300 hover:scale-105 active:scale-95"
            >
                Thêm
            </button>
        </form>
    );
}

export default TodoInput;
