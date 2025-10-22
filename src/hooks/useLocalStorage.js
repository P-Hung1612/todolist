import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(value));
        }, 300); // debounce 300ms

        return () => clearTimeout(timeout);
    }, [key, value]);

    return [value, setValue];
}
