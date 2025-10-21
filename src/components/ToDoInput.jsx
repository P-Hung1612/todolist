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
            />
            <button type="submit">Thêm</button>
        </form>
    );
}

export default TodoInput;
