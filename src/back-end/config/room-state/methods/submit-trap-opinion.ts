import { getPlayerTeam } from "../../../../functions/get-player-team.js"
import { RoomState } from "../room-state.js"

export function submitTrapOpinion(this: RoomState, sessionId: string, trap: string, newOpinion: boolean) {
  const clientTeam = getPlayerTeam(this, sessionId)

  const clientCurrentOpinion = this.teams[clientTeam].traps[trap].opinions[sessionId]
  const newOpinionIsDifferent = clientCurrentOpinion !== newOpinion

  this.teams[clientTeam].traps[trap].opinions[sessionId] = newOpinionIsDifferent ? newOpinion : undefined
}
