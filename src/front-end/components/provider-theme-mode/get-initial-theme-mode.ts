import { ThemeMode, themeModes } from "../../../types/types"

export  function getInitialThemeMode(localStorageKey: string, defaultThemeMode: ThemeMode): ThemeMode {
  const localStorageValue = localStorage.getItem(localStorageKey)

  let localStorageValueIsValid
  if (localStorageValue) localStorageValueIsValid = (themeModes as readonly string[]).includes(localStorageValue)

  return localStorageValue && localStorageValueIsValid ? (localStorageValue as ThemeMode) : defaultThemeMode
}
