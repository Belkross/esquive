import { doNothing } from "../../functions/do-nothing.js"
import ActivateIcon from "@mui/icons-material/Error"
import { IconButton } from "@mui/material"
import { AppState } from "../../types/main.js"
import { getClientTeam } from "../../functions/get-client-team.js"

type Props = {
  index: number
  appState: AppState
}

export function ButtonActivateTrap({ index, appState }: Props) {
  const whileDisabled = getWhileDisabled(appState)

  //const handleClick = () => socket.emit("activateTrap", index);

  return (
    <IconButton disabled={whileDisabled} onClick={() => doNothing(index)}>
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
