import { Box, Stack, SxProps } from "@mui/material"
import { AppState } from "../../types/main.js"
import { ButtonChat } from "./button-chat/button-chat.js"
import { ButtonMenu } from "./button-menu/button-menu.js"
import { ButtonSubmitWord } from "./button-submit-word/button-submit-word.js"
import { Timer } from "./timer.js"

type Props = {
  appState: AppState
}

export function ApplicationBar({ appState }: Props) {
  return (
    <Box component="nav" sx={style_container}>
      <Timer appState={appState} />
      <Stack sx={style_stackButtons}>
        <ButtonSubmitWord appState={appState} />
        <ButtonChat appState={appState} />
        <ButtonMenu appState={appState} />
      </Stack>
    </Box>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: { xs: "center", sm: "space-between" },
  alignItems: "center",
  marginBottom: { xs: 0, md: 3 },
  position: "fixed",
  bottom: "0cm",
  backgroundColor: "background.navBar",
  px: 2,
  py: 1.5,
  boxShadow: 7,
  width: "100%",
  zIndex: 2,
  gap: 1.5,
}

const style_stackButtons = {
  flexDirection: "row",
  gap: 1.2,
}
