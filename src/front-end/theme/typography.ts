import "@fontsource/roboto"
import "@fontsource/bona-nova"

const titleFont = "Bona Nova, serif"
const mainFont = "Roboto, sans-serif"

export default {
  h1: {
    fontFamily: titleFont,
    fontSize: 40,
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: mainFont,
    fontSize: 25,
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: mainFont,
    fontSize: 20,
    lineHeight: 1,
    fontWeight: 400,
    letterSpacing: -0.5,
  },
  body1: {
    fontFamily: mainFont,
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 400,
    letterSpacing: 0,
  },
  button: {
    fontFamily: mainFont,
    fontSize: 15,
    lineHeight: 1.4,
    fontWeight: 500,
    letterSpacing: 0,
    textTransform: "none" as const,
  },
}

// by default all fonts take color: palette.text.primary
