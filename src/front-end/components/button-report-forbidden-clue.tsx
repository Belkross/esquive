import { Stack, IconButton, Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state/room-state.js"
import { getPlayerTeam } from "../../functions/get-player-team.js"
import { AppState } from "../../types/types.js"
import ActivateIcon from "@mui/icons-material/Error"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  appState: AppState
}

export function ButtonReportForbiddenClue({ appState }: Props) {
  const { roomState, sessionId } = appState
  const whileDisplayed = getWhileDisplayed(roomState, sessionId)
  const whileDisabled = getWhileDisabled(roomState, sessionId)

  return whileDisplayed ? (
    <Stack sx={style_container}>
      <IconButton aria-label="Indice d’orateur incorrect" disabled={whileDisabled} onClick={handleClick}>
        <ActivateIcon />
      </IconButton>
      <Typography>Indice d’orateur interdit</Typography>
    </Stack>
  ) : null
}

function handleClick() {
  socket.emit("reportForbiddenClue")
}

function getWhileDisplayed(roomState: RoomState, sessionId: string) {
  const opponentTeam = getPlayerTeam(roomState, sessionId) === "one" ? "two" : "one"
  return roomState.roundPhase === `guessing ${opponentTeam}`
}

function getWhileDisabled(roomState: RoomState, sessionId: string) {
  const notJudgingTrap = roomState.isJudgingTrap === false
  const whileActivated = getWhileDisplayed(roomState, sessionId) && notJudgingTrap
  return !whileActivated
}

const style_container = {
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
  marginBottom: 2,
}
