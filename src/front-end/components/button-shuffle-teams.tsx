import { AppState } from "../../types/main.js"
import ShuffleIcon from "@mui/icons-material/Shuffle"
import { Button } from "@mui/material"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  appState: AppState
}

export function ButtonShuffleTeams({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  return (
    <Button startIcon={<ShuffleIcon />} onClick={handleClick} disabled={whileDisabled}>
      Mélanger les équipes
    </Button>
  )
}

function handleClick() {
  return socket.emit("shuffleTeams")
}

function getWhileDisabled(appState: AppState) {
  const { roomState, sessionId } = appState

  const clientIsAdmin = roomState.players[sessionId].isAdmin
  const duringPreRoundPhase = roomState.roundPhase === "pre round"

  const whileActivated = clientIsAdmin && duringPreRoundPhase

  return !whileActivated
}
