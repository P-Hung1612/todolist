import { io } from "socket.io-client";
const socket = io(
    process.env.REACT_APP_API_URL || "https://todolist-server-xtx5.onrender.com",
    { autoConnect: true }
);

