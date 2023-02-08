import breakpoints from "./breakpoints.js"
import shape from "./shape.js"
import palette from "./palette.js"
import createMuiComponents from "./components.js"
import typography from "./typography.js"
import { createTheme, responsiveFontSizes } from "@mui/material"
import { ThemeMode } from "../../types/types.js"

export default function createCustomizedMuiTheme(mode: ThemeMode) {
  const theme = createTheme({
    breakpoints: { values: { ...breakpoints } },
    palette: { mode, ...palette[mode] },
    typography,
    shape,
  })

  return createTheme(responsiveFontSizes(theme), createMuiComponents(theme))
}

/* typographies and default components might need palette/breakpoints/shape
values to define things and that’s why we need to create the theme in two
steps */
