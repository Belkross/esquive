import { getClientTeam } from "../../../../functions/get-client-team.js"
import { RoomState } from "../room-state.js"

export function activateTrap(this: RoomState, sessionId: string, trap: string) {
  const playerWhoActivates = this.players[sessionId].username

  const clientTeam = getClientTeam(this, sessionId)
  const trapAuthor = this.teams[clientTeam].traps[trap].author

  this.stopTimer()
  this.addToHistoric(`${playerWhoActivates} active un piège. ${trapAuthor} avait piégé le mot ${trap.toUpperCase()}.`)
  this.isJudgingTrap = true
}
