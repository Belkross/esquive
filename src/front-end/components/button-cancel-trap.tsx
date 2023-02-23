import CancelIcon from "@mui/icons-material/Cancel"
import { IconButton } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  trap: string
}

export default function ButtonCancelTrap({ trap }: Props) {
  const handleClick = () => socket.emit("cancelTrap", trap)

  return (
    <IconButton onClick={handleClick}>
      <CancelIcon />
    </IconButton>
  )
}
