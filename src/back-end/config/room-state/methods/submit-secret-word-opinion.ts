import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function submitSecretWordOpinion(this: RoomState, sessionId: string, newOpinion: boolean) {
  const clientTeam = getClientTeam(this, sessionId)

  const clientCurrentOpinion = this.teams[clientTeam].secretWord.opinions[sessionId]
  const newOpinionIsDifferent = clientCurrentOpinion !== newOpinion

  this.teams[clientTeam].secretWord.opinions[sessionId] = newOpinionIsDifferent ? newOpinion : undefined
}
