import { Badge } from "@mui/material"
import { ReactElement } from "react"
import { getClientTeam } from "../../../functions/get-client-team.js"
import { AppState } from "../../../types/main.js"

type Props = {
  children: ReactElement
  appState: AppState
}

export function BadgeGuessRemaining({ children, appState }: Props) {
  const { roomState, sessionId } = appState
  const clientTeam = getClientTeam(roomState, sessionId)
  const roundPhase = roomState.roundPhase

  const isClientGuessingPhase = roundPhase === `guessing ${clientTeam}`

  const { guessAttemptsRemaining } = roomState.teams[clientTeam]

  return (
    <Badge color="info" badgeContent={isClientGuessingPhase ? guessAttemptsRemaining : 0}>
      {children}
    </Badge>
  )
}
