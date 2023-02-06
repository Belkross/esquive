const smoothWhiteText = "rgba(255, 255, 255, .85)"
const smoothBlackText = "rgba(0, 0, 0, .85)"

const darkModePalette = {
  text: {
    primary: smoothWhiteText,
    opposite: smoothBlackText,
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
