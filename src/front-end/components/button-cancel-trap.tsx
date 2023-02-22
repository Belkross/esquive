import CancelIcon from "@mui/icons-material/Cancel"
import { IconButton } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"

export default function ButtonCancelTrap({ trap }: { trap: string }) {
  const handleClick = () => socket.emit("cancelTrap", trap)

  return (
    <IconButton onClick={handleClick}>
      <CancelIcon />
    </IconButton>
  )
}
