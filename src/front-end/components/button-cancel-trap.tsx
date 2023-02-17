import CancelIcon from "@mui/icons-material/Cancel"
import { IconButton } from "@mui/material"
import { doNothing } from "../../functions/do-nothing.js"

export default function ButtonCancelTrap({ index }: { index: number }) {
  //	const handleClick = () => socket.emit("cancelTrap", index);

  return (
    <IconButton onClick={() => doNothing(index)}>
      <CancelIcon />
    </IconButton>
  )
}
