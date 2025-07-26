import { useState } from "react";
export default function useLocalStorage(key, initialValue = "") {
    const [value, setValue] = useState(() => {
        try {
            return window.localStorage.getItem(key) || initialValue;
        } catch {
            return initialValue;
        }
    });

    const setStoredValue = val => {
        setValue(val);
        try {
            window.localStorage.setItem(key, val);
        } catch {
            setValue(val);
        }
    };

    return [value, setStoredValue];
}
