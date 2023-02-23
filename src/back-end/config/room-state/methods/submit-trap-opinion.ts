import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function submitTrapOpinion(this: RoomState, sessionId: string, trap: string, newOpinion: boolean) {
  const clientTeam = getClientTeam(this, sessionId)

  const clientCurrentOpinion = this.teams[clientTeam].traps[trap]?.opinions[sessionId]
  const newOpinionIsDifferent = clientCurrentOpinion !== newOpinion

  this.teams[clientTeam].traps[trap].opinions[sessionId] = newOpinionIsDifferent ? newOpinion : undefined
}
