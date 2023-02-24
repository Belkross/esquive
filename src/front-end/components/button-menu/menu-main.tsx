import { AppState } from "../../../types/main.js"
import { SwitchThemeMode } from "../switch-theme-mode.js"
import { ButtonLeaveRoom } from "../button-leave-room.js"
import { ButtonDiscord } from "../button-discord.js"
import { RoomSettings } from "../room-settings.js"

type Props = {
  appState: AppState
}
export function MenuMain({ appState }: Props) {
  return (
    <>
      <ButtonDiscord />
      <SwitchThemeMode />
      <ButtonLeaveRoom />
      <RoomSettings appState={appState} />
    </>
  )
}
