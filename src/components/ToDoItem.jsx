import React, { useState } from "react";
import { motion } from "framer-motion";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [deadline, setDeadline] = useState(todo.deadline || "");
  const [priority, setPriority] = useState(todo.priority || "medium");

  const handleSave = () => {
    onUpdate && onUpdate(todo._id, { text, deadline, priority });
    setEditing(false);
  };

  return (
    <motion.li layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all duration-300 ${todo.done
        ? "bg-green-100 line-through text-gray-500"
        : "bg-gray-50 hover:bg-blue-50"
        }`}
      onClick={() => !editing && onToggle(todo._id)}
    >
      {editing ? (
        <div className="flex flex-col sm:flex-row flex-wrap w-full gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 min-w-[150px] w-full sm:w-auto px-2 py-1 border rounded"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto"
          >
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lưu
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="font-medium">{todo.text}</span>
            {todo.deadline && (
              <span className="text-xs text-gray-400 ml-2">
                ⏰ {new Date(todo.deadline).toLocaleDateString()}
              </span>
            )}
            <span
              className={`ml-2 text-xs font-semibold ${todo.priority === "high"
                ? "text-red-500"
                : todo.priority === "medium"
                  ? "text-yellow-500"
                  : "text-green-500"
                }`}
            >
              ● {todo.priority}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              className="text-blue-500 hover:text-blue-700"
              title="Chỉnh sửa"
            >
              ✏️
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo._id);
              }}
              className="text-red-500 hover:text-red-700"
              title="Xóa"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </motion.li>
  );
}

export default React.memo(TodoItem);
