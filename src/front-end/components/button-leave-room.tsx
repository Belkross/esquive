import LogoutIcon from "@mui/icons-material/Logout"
import { Button, SxProps } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"

export function ButtonLeaveRoom() {
  return (
    <Button startIcon={<LogoutIcon />} onClick={handleClick} sx={style_button}>
      Quitter le salon
    </Button>
  )
}

function handleClick() {
  socket.disconnect()
}

const buttonColor = "error.main"

const style_button: SxProps = {
  backgroundColor: buttonColor,
  borderColor: buttonColor,
  ":hover": {
    borderColor: buttonColor,
  },
}
