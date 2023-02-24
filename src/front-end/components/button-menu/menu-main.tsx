import { AppState, setState } from "../../../types/main.js"
import { SwitchThemeMode } from "../switch-theme-mode.js"
import { ButtonLeaveRoom } from "../button-leave-room.js"
import { ButtonDiscord } from "../button-discord.js"
import { RoomSettings } from "../room-settings.js"

type Props = {
  setAppState: setState<AppState>
  appState: AppState
}
export function MenuMain({ setAppState , appState}: Props) {
  return (
    <>
      <ButtonDiscord />
      <SwitchThemeMode />
      <ButtonLeaveRoom setAppState={setAppState} /> 
      <RoomSettings appState={appState}/>
    </>
  )
}
