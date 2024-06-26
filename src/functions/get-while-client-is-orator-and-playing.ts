import { AppState } from "../types/types.js"
import { getPlayerTeam } from "./get-player-team.js"

export function getWhileClientIsOratorAndPlaying(appState: AppState) {
  const { roomState, sessionId } = appState
  const clientIsOrator = roomState.players[sessionId].role === "orator"
  const clientTeam = getPlayerTeam(roomState, sessionId)
  const duringHisGuessingPhase = roomState.roundPhase === `guessing ${clientTeam}`

  return clientIsOrator && duringHisGuessingPhase
}
