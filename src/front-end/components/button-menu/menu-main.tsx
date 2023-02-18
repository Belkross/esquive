import { Button } from "@mui/material"
import { AppState, setState } from "../../../types/main.js"
import { socket } from "../../config/initialize-socket-io.js"

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
      <div>TabMain</div>
      <Button onClick={handleClick}>Leave</Button>
    </>
  )
}
