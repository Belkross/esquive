import { Badge, IconButton } from "@mui/material"
import { doNothing } from "../../../functions/do-nothing.js"
import ChangeIcon from "@mui/icons-material/Replay.js"
import { AppState } from "../../../types/main.js"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { RoomState } from "../../../back-end/config/room-state/room-state.js"

type Props = {
  appState: AppState
}

export function ButtonChangeSecretWord({ appState }: Props) {
  const { roomState, sessionId } = appState

  const changeRemaining = getChangeRemaining(roomState, sessionId)
  const whileDisabled = getWhileDisabled(roomState, changeRemaining)
  const badgeContent = whileDisabled ? 0 : changeRemaining

  /* const handleClick = () => {
    const someChangeRemains = changeRemaining > 0
    if (someChangeRemains) socket.emit("changeSecretWord")
  } */

  return (
    <Badge color="info" badgeContent={badgeContent}>
      <IconButton aria-label="changer mot secret" onClick={doNothing} disabled={whileDisabled}>
        <ChangeIcon />
      </IconButton>
    </Badge>
  )
}

function getChangeRemaining(roomState: RoomState, sessionId: string) {
  const clientTeam = getClientTeam(roomState, sessionId)
  return roomState.teams[clientTeam].secretWordChangeRemaining
}

function getWhileDisabled(roomState: RoomState, changeRemaining: number) {
  const someChangeRemains = changeRemaining > 0
  const duringTrappingPhase = roomState.roundPhase === "trapping"
  const whileActivated = duringTrappingPhase && someChangeRemains
  return !whileActivated
}
