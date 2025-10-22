import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

// Lấy tất cả todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

// Thêm todo
router.post("/", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: "Text là bắt buộc" });
        const todo = new Todo({ text });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

// Cập nhật todo
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
        if (!todo) return res.status(404).json({ error: "Không tìm thấy todo" });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

// Xóa todo
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) return res.status(404).json({ error: "Không tìm thấy todo" });
        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: "Lỗi server" });
    }
});

export default router;