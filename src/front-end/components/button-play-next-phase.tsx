import { IconButton } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state.js"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { doNothing } from "../../functions/do-nothing.js"

type Props = {
  roomState: RoomState
}

export function ButtonPlayNextPhase({ roomState }: Props) {
  doNothing(roomState)

  //const handle_click = () => socket.emit("nextRoundPhase")

  return (
    <IconButton /* onClick={handle_click} disabled={whileDisabled(roomState)} */>
      <PlayArrowIcon />
    </IconButton>
  )
}

/* function whileDisabled(roomState: RoomState) {
  const clientId = socket.id
  const clientIsAdmin = roomState.players[clientId].isAdmin

  const roundPhase = roomState.roundPhase
  const duringPassiveRoundPhase =
    roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"

  const whileActivated = clientIsAdmin && duringPassiveRoundPhase

  return !whileActivated
} */
