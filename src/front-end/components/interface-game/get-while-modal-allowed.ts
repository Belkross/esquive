import { getPlayerTeam } from "../../../functions/get-player-team.js"
import { AppState } from "../../../types/types.js"

export function getWhileModalAllowed(appState: AppState) {
  const { roomState, sessionId } = appState
  const clientTeam = getPlayerTeam(roomState, sessionId)

  const isTrappingPhase = roomState.roundPhase === "trapping"
  const isClientTurnToGuess = roomState.roundPhase === `guessing ${clientTeam}`
  const clientIsGuesser = roomState.players[sessionId].role === "guesser"
  const isNotJudgingTrap = !roomState.isJudgingTrap

  return isTrappingPhase || (isClientTurnToGuess && clientIsGuesser && isNotJudgingTrap)
}
