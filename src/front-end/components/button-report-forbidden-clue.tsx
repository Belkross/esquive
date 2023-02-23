import { Stack, IconButton, Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state/room-state.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { AppState } from "../../types/main.js"
import ErrorIcon from "@mui/icons-material/Error"
import { socket } from "../config/initialize-socket-io.js"

type Props = {
  appState: AppState
}

export function ButtonReportForbiddenClue({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState.roomState, appState.sessionId)

  return (
    <Stack sx={style_container}>
      <IconButton aria-label="Indice d’orateur incorrect" disabled={whileDisabled} onClick={handleClick}>
        <ErrorIcon />
      </IconButton>
      <Typography>Indice d’orateur interdit</Typography>
    </Stack>
  )
}

function handleClick() {
  socket.emit("reportForbiddenClue")
}

function getWhileDisabled(roomState: RoomState, sessionId: string) {
  const opponentTeam = getClientTeam(roomState, sessionId) === "one" ? "two" : "one"
  const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`

  const notJudgingTrap = roomState.isJudgingTrap === false

  const whileActivated = duringOpponentGuessingPhase && notJudgingTrap

  return !whileActivated
}

const style_container = {
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 2,
  gap: 1,
  px: 1,
  marginBottom: 2,
}
