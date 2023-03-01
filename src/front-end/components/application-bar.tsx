import { Box, Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { AppState } from "../../types/main.js"
import shape from "../theme/shape.js"
import { ButtonChat } from "./button-chat/button-chat.js"
import { ButtonMenu } from "./button-menu/button-menu.js"
import { ButtonSubmitWord } from "./button-submit-word/button-submit-word.js"
import { Timer } from "./timer.js"

type Props = {
  appState: AppState
}

export function ApplicationBar({ appState }: Props) {
  const smallScreen = useMediaQuery(useTheme().breakpoints.down("lg"))

  return (
    <Box component="nav" sx={style_container}>
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        {smallScreen && <ButtonSubmitWord appState={appState} />}
        <ButtonChat appState={appState} />
        <ButtonMenu appState={appState} />
      </Stack>
    </Box>
  )
}

const style_container: SxProps = {
  position: { xs: "fixed", lg: "static" },
  bottom: 0,

  display: "flex",
  flexFlow: "row wrap",
  justifyContent: { xs: "center", sm: "space-between", lg: "space-around" },
  alignItems: "center",
  gap: 1.5,

  width: "100vw",
  height: shape.appBarHeight,
  backgroundColor: "background.navBar",
  marginBottom: { lg: 3 },
  px: 2,
  boxShadow: 16,
  zIndex: 2,

  borderColor: "background.border",
  borderWidth: shape.borderWidth,
  borderTopStyle: { xs: shape.borderStyle, lg: "none" },
  borderBottomStyle: { xs: "none", lg: "solid" },
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1.2,
}
