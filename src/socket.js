import { io } from "socket.io-client";

// ✅ Tự động chọn URL phù hợp với môi trường
const BASE_URL =
    process.env.REACT_APP_API_URL || "https://todolist-server-xtx5.onrender.com";

// ✅ Khởi tạo socket
const socket = io(BASE_URL, {
    transports: ["websocket"],
    autoConnect: true,
});

// 🧠 Debug log — tiện kiểm tra trong console
socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
    console.error("❌ Socket connection error:", err.message);
});

export default socket;
