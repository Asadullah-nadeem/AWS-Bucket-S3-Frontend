import { createContext, useState, useContext } from "react";

const DisplayModeContext = createContext();

export function DisplayModeProvider({ children }) {
    const [displayMode, setDisplayMode] = useState("dual");

    return (
        <DisplayModeContext.Provider value={{ displayMode, setDisplayMode }}>
            {children}
        </DisplayModeContext.Provider>
    );
}

export function useDisplayMode() {
    return useContext(DisplayModeContext);
}