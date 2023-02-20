import { Box, Stack, SxProps } from "@mui/material"
import { ButtonChat } from "./button-chat.js"
import { ButtonMenu } from "./button-menu/button-menu.js"
import { ButtonSubmitWord } from "./button-submit-word.js"
import { InterfaceGameProps } from "./interface-game/interface-game.js"
import { Timer } from "./timer.js"

export function ApplicationBar({ appState, setAppState }: InterfaceGameProps) {
  return (
    <Box component="nav" sx={style_container}>
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        <ButtonSubmitWord roomState={appState.roomState} />
        <ButtonChat roomState={appState.roomState} />
        <ButtonMenu appState={appState} setAppState={setAppState} />
      </Stack>
    </Box>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexDirection: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: { xs: 0, md: 3 },
  position: "fixed",
  bottom: "0cm",
  backgroundColor: "background.navBar",
  px: 3,
  py: 1.5,
  boxShadow: 7,
  width: "100%",
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1.2,
}
