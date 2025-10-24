import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function AuthForm() {
    const { login, register } = useAuthStore();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", username, password, isLogin);
        isLogin ? login(username, password) : register(username, password);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl mb-4">{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
                <input
                    className="border p-2 rounded"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="border p-2 rounded"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600">
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </button>
            </form>
            <button
                className="text-sm mt-3 text-blue-400 hover:underline"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập"}
            </button>
        </div>
    );
}

export default AuthForm;
