import { IconButton } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { AppState } from "../../types/main.js"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  appState: AppState
}

const handle_click = () => socket.emit("nextRoundPhase")

export function ButtonPlayNextPhase({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  return (
    <IconButton onClick={handle_click} disabled={whileDisabled}>
      <PlayArrowIcon />
    </IconButton>
  )
}

function getWhileDisabled(appState: AppState) {
  const { roomState, browserId } = appState

  const clientIsAdmin = roomState.players[browserId].isAdmin

  const roundPhase = roomState.roundPhase
  const duringPassivePhase =
    roundPhase === "pre round" || roundPhase === "pre guessing one" || roundPhase === "pre guessing two"

  const whileActivated = clientIsAdmin && duringPassivePhase

  return !whileActivated
}
