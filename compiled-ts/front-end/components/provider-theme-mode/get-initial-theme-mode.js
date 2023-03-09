export function getInitialThemeMode(localStorageKey, defaultThemeMode) {
    const localStorageValue = localStorage.getItem(localStorageKey);
    const noStoredThemeMode = localStorageValue === null;
    if (noStoredThemeMode) {
        return defaultThemeMode;
    }
    else {
        const storedValueIsValid = ["dark", "light"].includes(localStorageValue);
        return storedValueIsValid ? localStorageValue : defaultThemeMode;
    }
}
