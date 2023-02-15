import { blue, indigo, red } from "@mui/material/colors"

const smoothWhiteText = "rgba(255, 255, 255, .85)"
const smoothBlackText = "rgba(0, 0, 0, .85)"

const darkModePalette = {
  primary: { main: blue[800] },
  teamOne: { main: indigo[400] },
  teamTwo: { main: red[400] },
  text: {
    primary: smoothWhiteText,
    opposite: smoothBlackText,
  },
  background: {
    default: "#0a1929",
    paper: "#132f4c",
    navBar: "#001e3c",
  },
}

const lightModePalette: typeof darkModePalette = {
  ...darkModePalette,
  text: {
    primary: smoothBlackText,
    opposite: smoothWhiteText,
  },
}

export default {
  dark: darkModePalette,
  light: lightModePalette,
}
