import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { useAuthStore } from "./useAuthStore";

const API_URL = process.env.REACT_APP_API_URL + "api/todos";
const socket = io(
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5001",
    { autoConnect: true }
);

export const useTodoStore = create((set, get) => ({
    todos: [],
    filter: "all",
    search: "",
    loading: false,

    // ✅ Lấy danh sách todos
    fetchTodos: async () => {
        set({ loading: true });
        try {
            const res = await axios.get(API_URL);
            set({ todos: res.data });
        } catch {
            toast.error("Không thể tải dữ liệu 😢");
        } finally {
            set({ loading: false });
        }
    },

    // ✅ Thêm todo
    addTodo: async (text) => {
        if (!text.trim()) return toast.error("Nhập nội dung trước nhé!");
        try {
            const res = await axios.post(API_URL, { text });
            set((state) => ({ todos: [res.data, ...state.todos] }));
            toast.success("✅ Đã thêm công việc!");
            socket.emit("todoUpdated");
        } catch {
            toast.error("Thêm thất bại 😢");
        }
    },

    // ✅ Đổi trạng thái hoàn thành
    toggleTodo: async (id, done) => {
        try {
            const res = await axios.patch(`${API_URL}/${id}`, { done: !done });
            set((state) => ({
                todos: state.todos.map((t) => (t._id === id ? res.data : t)),
            }));
            toast("🔁 Cập nhật trạng thái!");
            socket.emit("todoUpdated");
        } catch {
            toast.error("Cập nhật thất bại 😢");
        }
    },

    // ✅ Xóa todo
    deleteTodo: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            set((state) => ({
                todos: state.todos.filter((t) => t._id !== id),
            }));
            toast.error("🗑️ Đã xóa công việc");
            socket.emit("todoUpdated");
        } catch {
            toast.error("Xóa thất bại 😢");
        }
    },

    // ✅ Sửa todo (text, deadline, priority)
    updateTodo: async (id, data) => {
        try {
            const res = await axios.patch(`${API_URL}/${id}`, data);
            set((state) => ({
                todos: state.todos.map((t) => (t._id === id ? res.data : t)),
            }));
            toast.success("✏️ Đã cập nhật công việc!");
            socket.emit("todoUpdated");
        } catch {
            toast.error("Cập nhật thất bại 😢");
        }
    },

    // ✅ Filter / Search
    setFilter: (filter) => set({ filter }),
    setSearch: (search) => set({ search }),

    // ✅ Lọc dữ liệu
    filteredTodos: () => {
        const { todos, filter, search } = get();
        return todos.filter((todo) => {
            const matchFilter =
                filter === "all" ||
                (filter === "done" && todo.done) ||
                (filter === "active" && !todo.done);
            const matchSearch = todo.text
                .toLowerCase()
                .includes(search.toLowerCase());
            return matchFilter && matchSearch;
        });
    },
}));
