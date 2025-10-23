import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

// 🔧 Tự động gắn token vào mọi request nếu có
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


const API_URL = "http://localhost:5001/api/auth";

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,

    login: async (username, password) => {
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            set({ user: res.data.user, token: res.data.token });
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            toast.success("Đăng nhập thành công!");
        } catch {
            toast.error("Sai tài khoản hoặc mật khẩu");
        }
    },

    register: async (username, password) => {
        try {
            await axios.post(`${API_URL}/register`, { username, password });
            toast.success("Đăng ký thành công! Hãy đăng nhập.");
        } catch {
            toast.error("Tài khoản đã tồn tại");
        }
    },

    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast("👋 Đã đăng xuất");
    },
    
    checkAuth: async () => {
        const token = localStorage.getItem("token");
        if (!token) return set({ user: null, token: null });

        try {
            const res = await axios.get(`${API_URL}/me`); // server trả về user hiện tại
            set({ user: res.data.user, token });
        } catch {
            set({ user: null, token: null });
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.error("Phiên đăng nhập hết hạn, hãy đăng nhập lại!");
        }
    },

}));
