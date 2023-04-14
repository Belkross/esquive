import { ThemeMode } from "../../../types/types"

export function getInitialThemeMode(localStorageKey: string, defaultThemeMode: ThemeMode): ThemeMode {
  const localStorageValue = localStorage.getItem(localStorageKey)
  const noStoredThemeMode = localStorageValue === null

  if (noStoredThemeMode) {
    return defaultThemeMode
  } else {
    const storedValueIsValid = ["dark", "light"].includes(localStorageValue)
    return storedValueIsValid ? (localStorageValue as ThemeMode) : defaultThemeMode
  }
}
