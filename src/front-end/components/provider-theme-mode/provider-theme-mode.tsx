import { createContext, ReactElement, useContext, useState } from "react"
import { doNothing } from "../../../functions/do-nothing.js"
import { ThemeMode } from "../../../types/main"
import localStorageKeys from "../../config/local-storage-keys"
import { getInitialThemeMode } from "./get-initial-theme-mode.js"

const defaultThemeMode = "dark"
const initialThemeMode = getInitialThemeMode(localStorageKeys.themeMode, defaultThemeMode)

const ThemeModeContext = createContext<ThemeMode>(defaultThemeMode)
export const useThemeMode = () => useContext(ThemeModeContext)

const ToggleThemeModeContext = createContext(() => doNothing())
export const useToggleThemeMode = () => useContext(ToggleThemeModeContext)

type Props = {
  children: ReactElement
}

export function ProviderThemeMode({ children }: Props) {
  const [themeMode, setThemeMode] = useState(initialThemeMode)

  const toggleThemeMode = () => {
    const newState = themeMode === "dark" ? "light" : "dark"
    setThemeMode(newState)
    localStorage.setItem(localStorageKeys.themeMode, newState)
  }

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ToggleThemeModeContext.Provider value={toggleThemeMode}>{children}</ToggleThemeModeContext.Provider>
    </ThemeModeContext.Provider>
  )
}
