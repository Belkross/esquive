import { AppState, setState } from "../../../types/main.js"
import { SwitchThemeMode } from "../switch-theme-mode.js"
import { ButtonLeaveRoom } from "../button-leave-room.js"
import { ButtonDiscord } from "../button-discord.js"

type Props = {
  setAppState: setState<AppState>
}
export function MenuMain({ setAppState }: Props) {
  return (
    <>
      <ButtonDiscord />
      <SwitchThemeMode />
      <ButtonLeaveRoom setAppState={setAppState} /> 
    </>
  )
}
