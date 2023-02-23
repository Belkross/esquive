import ActivateIcon from "@mui/icons-material/Error"
import { IconButton } from "@mui/material"
import { AppState } from "../../types/main.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  trap: string
  appState: AppState
}

export function ButtonActivateTrap({ trap, appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  const handleClick = () => socket.emit("activateTrap", trap)

  return (
    <IconButton disabled={whileDisabled} onClick={handleClick}>
      <ActivateIcon />
    </IconButton>
  )
}

function getWhileDisabled(appState: AppState) {
  const { roomState, sessionId } = appState
  const opponentTeam = getClientTeam(roomState, sessionId) === "one" ? "two" : "one"
  const currentRoundPhase = roomState.roundPhase
  const DuringOpponentGuessingPhase = currentRoundPhase === `guessing ${opponentTeam}`

  const isNotJudgingTrap = roomState.isJudgingTrap === false

  const whileActivated = DuringOpponentGuessingPhase && isNotJudgingTrap

  return !whileActivated
}
