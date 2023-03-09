import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
import { doNothing } from "../../../functions/do-nothing.js";
import storageKeys from "../../config/storage-keys";
import { getInitialThemeMode } from "./get-initial-theme-mode.js";
const defaultThemeMode = "dark";
const initialThemeMode = getInitialThemeMode(storageKeys.themeMode, defaultThemeMode);
const ThemeModeContext = createContext(defaultThemeMode);
export const useThemeMode = () => useContext(ThemeModeContext);
const ToggleThemeModeContext = createContext(doNothing);
export const useToggleThemeMode = () => useContext(ToggleThemeModeContext);
export function ProviderThemeMode({ children }) {
    const [themeMode, setThemeMode] = useState(initialThemeMode);
    const toggleThemeMode = () => {
        const newState = themeMode === "dark" ? "light" : "dark";
        setThemeMode(newState);
        localStorage.setItem(storageKeys.themeMode, newState);
    };
    return (_jsx(ThemeModeContext.Provider, { value: themeMode, children: _jsx(ToggleThemeModeContext.Provider, { value: toggleThemeMode, children: children }) }));
}
