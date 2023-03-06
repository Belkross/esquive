import { Stack, useMediaQuery, useTheme } from "@mui/material"
import { AppState, FlowlessFunction } from "../../../types/main.js"
import { Timer } from "../timer.js"
import { ButtonSubmitWord } from "../button-submit-word/button-submit-word.js"
import { style_tabs } from "../button-menu/tab-group-menu.js"
import ButtonCloseElement from "../button-close-element.js"

type Props = {
  closeDrawer: FlowlessFunction
  appState: AppState
  openSubmitWordModal: FlowlessFunction
}

export function NavbarChatOrator({ closeDrawer, appState, openSubmitWordModal }: Props) {
  const smallScreenLayout = useMediaQuery(useTheme().breakpoints.down("lg"))

  return (
    <Stack component="nav" sx={style_tabs}>
      <Timer appState={appState} />
      <ButtonSubmitWord appState={appState} openModal={openSubmitWordModal} />
      {smallScreenLayout && <ButtonCloseElement onClick={closeDrawer} />}
    </Stack>
  )
}
