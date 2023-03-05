import { Box, Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { AppState, FlowlessFunction } from "../../types/main.js"
import shape from "../theme/shape.js"
import { ButtonChat } from "./button-chat/button-chat.js"
import { ButtonMenu } from "./button-menu/button-menu.js"
import { ButtonSubmitWord } from "./button-submit-word/button-submit-word.js"
import { Timer } from "./timer.js"

type Props = {
  appState: AppState
  openSubmitWordModal: FlowlessFunction
}

export function ApplicationBar({ appState , openSubmitWordModal}: Props) {
  const smallScreen = useMediaQuery(useTheme().breakpoints.down("lg"))

  return (
    <Box component="nav" sx={style_container}>
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        {smallScreen && <ButtonSubmitWord appState={appState} openModal={openSubmitWordModal}/>}
        <ButtonChat appState={appState} openSubmitWordModal={openSubmitWordModal}/>
        <ButtonMenu appState={appState} />
      </Stack>
    </Box>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: { xs: "center", sm: "space-between", xl: "space-around" },
  alignItems: "center",
  gap: 1.5,

  width: "100vw",
  minHeight: shape.appBarHeight,
  backgroundColor: "background.navBar",
  px: 2,
  py: 1.5,
  boxShadow: 16,
  zIndex: 2,

  borderColor: "primary.main",
  borderWidth: shape.borderWidth,
  borderTopStyle: { xs: shape.borderStyle, lg: "none" },
  borderBottomStyle: { xs: "none", lg: "solid" },
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1.2,
}
