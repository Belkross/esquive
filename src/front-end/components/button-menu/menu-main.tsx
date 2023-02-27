import { AppState } from "../../../types/main.js"
import { SwitchThemeMode } from "../switch-theme-mode.js"
import { ButtonLeaveRoom } from "../button-leave-room.js"
import { RoomSettings } from "../room-settings.js"
import { SwitchSoundActivation } from "../switch-sound-activation.js"
import { Stack, SxProps } from "@mui/material"
import { LinkDiscord } from "../link-discord.js"
import { MenuElementContainer } from "./menu-element-container.js"

type Props = {
  appState: AppState
}
export function MenuMain({ appState }: Props) {
  return (
    <Stack sx={style_container}>
      <MenuElementContainer sx={style_discord}>
        <LinkDiscord />
      </MenuElementContainer>

      <MenuElementContainer>
        <SwitchThemeMode />
      </MenuElementContainer>

      <MenuElementContainer>
        <SwitchSoundActivation />
      </MenuElementContainer>

      <MenuElementContainer sx={style_room}>
        <RoomSettings appState={appState} />
      </MenuElementContainer>

      <MenuElementContainer sx={style_leave}>
        <ButtonLeaveRoom />
      </MenuElementContainer>
    </Stack>
  )
}

const style_container: SxProps = {
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: 0,
  height: "100%",
}

const style_discord: SxProps = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  gap: 2,
}

const style_room: SxProps = {
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  gap: 1,
  py: 5,
}

const style_leave: SxProps = {
  textAlign: "center",
  height: "100%",
  paddingTop: 4,
  paddingBottom: 15,
}
