import LogoutIcon from "@mui/icons-material/Logout"
import { Button, SxProps } from "@mui/material"
import { AppState, setState } from "../../types/main.js"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  setAppState: setState<AppState>
}

export function ButtonLeaveRoom({ setAppState }: Props) {
  const handleClick = () => {
    socket.disconnect()
    setAppState((prevAppState) => ({ ...prevAppState, status: "logging", room: "" }))
  }

  return (
    <Button startIcon={<LogoutIcon />} onClick={handleClick} sx={style_button}>
      Quitter le salon
    </Button>
  )
}

const buttonColor = "error.main"

const style_button: SxProps = {
  backgroundColor: buttonColor,
  borderColor: buttonColor,
  ":hover": {
    borderColor: buttonColor,
  },
}
