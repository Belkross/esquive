import { Stack, SxProps, useMediaQuery, useTheme } from "@mui/material"
import { AppState, FlowlessFunction } from "../../../types/types.js"
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
    <Stack component="nav" sx={style_container}>
      <Stack sx={style_playingFeatures}>
        <Timer appState={appState} />
        <ButtonSubmitWord appState={appState} openModal={openSubmitWordModal} />
      </Stack>

      {smallScreenLayout && <ButtonCloseElement onClick={closeDrawer} />}
    </Stack>
  )
}

const style_container: SxProps = {
  ...style_tabs,
  justifyContent: { xs: "space-between", lg: "center" },
}

const style_playingFeatures: SxProps = {
  flexDirection: "row",
  gap: { xs: 1, sm: 2 },
}
