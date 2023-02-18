import { Button } from "@mui/material"
import { AppState, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"
import { SwitchThemeMode } from "../switch-theme-mode.js"

type Props = {
  setAppState: setState<AppState>
}
export function MenuMain({ setAppState }: Props) {
  const handleClick = () => {
    socket.disconnect()
    setAppState((prevAppState) => ({ ...prevAppState, status: "logging", room: "" }))
  }
  return (
    <>
      <SwitchThemeMode />
      <Button onClick={handleClick}>Leave</Button>
    </>
  )
}
