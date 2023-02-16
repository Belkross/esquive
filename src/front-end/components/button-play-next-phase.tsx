import { IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { doNothing } from "../../functions/do-nothing.js"
import { AppState } from "../../types/main.js"

type Props = {
  appState: AppState
}

export function ButtonPlayNextPhase({ appState }: Props) {
  doNothing(appState)

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
