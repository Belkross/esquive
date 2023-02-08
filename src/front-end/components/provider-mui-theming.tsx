import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"
import { ReactElement } from "react"
import createCustomizedMuiTheme from "../theme/create-customized-mui-theme"
import { useThemeMode } from "./provider-theme-mode/provider-theme-mode"

type Props = {
  children: ReactElement
}

export default function ProviderMuiTheming({ children }: Props) {
  const themeMode = useThemeMode()

  return (
    <ThemeProvider theme={createCustomizedMuiTheme(themeMode)}>
      <CssBaseline enableColorScheme />
      {StaticGlobalStyles}
      {children}
    </ThemeProvider>
  )
}

const StaticGlobalStyles = (
  <GlobalStyles
    styles={
      {
        /* body: {
      backgroundColor: "red"
    } */
      }
    }
  />
)
