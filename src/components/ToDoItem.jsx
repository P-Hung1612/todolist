function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      className={`todo-item ${todo.done ? "done" : ""}`}
      onClick={() => onToggle(todo.id)}
    >
      <span>{todo.text}</span>
      <button onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}>✖</button>
    </li>
  );
}
export default TodoItem;