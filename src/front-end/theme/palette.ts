import { blue, green, grey, indigo, orange, red } from "@mui/material/colors"

const smoothWhiteText = "rgba(255, 255, 255, .85)"
const smoothBlackText = "rgba(0, 0, 0, .85)"

const darkModePalette = {
  primary: { main: blue[800] },
  team: { one: indigo[400], two: red[400] },
  admin: { main: green[700] },
  warning: { main: orange[600] },
  text: {
    primary: smoothWhiteText,
    opposite: smoothBlackText,
    rule: orange[400] as string,
  },
  background: {
    default: "#0a1929",
    paper: "#102c49",
    borderPaper: "#244d77",
    navBar: "#001e3c",
    historic: grey[900],
  },
}

const lightModePalette: typeof darkModePalette = {
  ...darkModePalette,
  text: {
    primary: smoothBlackText,
    opposite: smoothWhiteText,
    rule: red[900],
  },
}

export default {
  dark: darkModePalette,
  light: lightModePalette,
}
