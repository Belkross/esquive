import { Switch, FormControlLabel } from "@mui/material"
import { useThemeMode, useToggleThemeMode } from "./provider-theme-mode/provider-theme-mode.js"

export function SwitchThemeMode() {
  const themeMode = useThemeMode()
  const toggleThemeMode = useToggleThemeMode()

  const label = themeMode === "dark" ? "Theme sombre" : "Theme clair"
  const checked = themeMode === "dark" ? true : false

  const SwitchThemeMode = <Switch color="info" checked={checked} onChange={() => toggleThemeMode()} />

  return <FormControlLabel control={SwitchThemeMode} label={label} />
}
