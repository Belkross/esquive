import { Stack, IconButton, Typography } from "@mui/material"
import { RoomState } from "../../back-end/config/room-state.js"
import { doNothing } from "../../functions/do-nothing.js"
import { getClientTeam } from "../../functions/get-client-team.js"
import { AppState } from "../../types/main.js"
import ErrorIcon from "@mui/icons-material/Error"

type Props = {
  appState: AppState
}

export function ButtonReportForbiddenClue({ appState }: Props) {
  const whileDisabled = getWhileDisabled(appState.roomState, appState.browserId)

  //const handleClick = () => socket.emit("reportForbiddenClue")

  return (
    <Stack sx={style_container}>
      <IconButton aria-label="Indice d’orateur incorrect" disabled={whileDisabled} onClick={doNothing}>
        <ErrorIcon />
      </IconButton>
      <Typography>Indice d’orateur interdit</Typography>
    </Stack>
  )
}

const style_container = {
  flexDirection: "row",
  alignItems: "center",
  paddingTop: 2,
  gap: 1,
  px: 2,
  marginBottom: 2,
}

function getWhileDisabled(roomState: RoomState, browserId: string) {
  const opponentTeam = getClientTeam(roomState, browserId) === "one" ? "two" : "one"
  const duringOpponentGuessingPhase = roomState.roundPhase === `guessing ${opponentTeam}`

  const notJudgingTrap = roomState.isJudgingTrap === false

  const whileActivated = duringOpponentGuessingPhase && notJudgingTrap

  return !whileActivated
}
