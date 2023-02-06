import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"
import { ReactElement } from "react"
import createMuiTheme from "../theme/create-mui-theme"

type Props = {
  children: ReactElement
}

export default function ProviderMuiTheming({ children }: Props) {
  const themeMode = "dark"

  return (
    <ThemeProvider theme={createMuiTheme(themeMode)}>
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
