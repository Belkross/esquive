import { Box, Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { AppState, FlowlessFunction } from "../../types/types.js"
import shape from "../theme/shape.js"
import { ButtonChatGeneral } from "./button-chat/button-chat-general.js"
import { ButtonChatOrator } from "./button-chat/button-chat-orator.js"
import { ButtonMenu } from "./button-menu/button-menu.js"
import { ButtonSubmitWord } from "./button-submit-word/button-submit-word.js"
import { Timer } from "./timer.js"

type Props = {
  appState: AppState
  openSubmitWordModal: FlowlessFunction
}

export function ApplicationBar({ appState, openSubmitWordModal }: Props) {
  const smallScreen = useMediaQuery(useTheme().breakpoints.down("lg"))

  return (
    <Box component="nav" sx={style_container}>
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        {smallScreen && <ButtonSubmitWord appState={appState} openModal={openSubmitWordModal} />}
        <ButtonChatGeneral appState={appState} />
        <ButtonChatOrator appState={appState} openSubmitWordModal={openSubmitWordModal} />
        <ButtonMenu appState={appState} />
      </Stack>
    </Box>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: { xs: "center", sm: "space-between", xl: "space-around" },
  alignItems: "center",
  gap: 1.5,

  position: "fixed",
  bottom: { xs: 0, lg: "inherit" },
  top: { xs: "inherit", lg: 0 },

  width: "100vw",
  height: `${shape.appBarHeight}px`,
  backgroundColor: "background.navBar",
  px: 2,
  py: 1.5,
  boxShadow: shape.navbarShadow,
  zIndex: 2,
  overflowX: { xs: "scroll", sm: "hidden" },

  borderColor: "primary.main",
  borderWidth: shape.borderWidth,
  borderTopStyle: { xs: shape.borderStyle, lg: "none" },
  borderBottomStyle: { xs: "none", lg: "solid" },
}

const style_stackButtons = {
  flexDirection: "row",
  gap: shape.spacingTabs,
}
