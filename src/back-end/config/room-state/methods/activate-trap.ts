import { getPlayerTeam } from "../../../../functions/get-player-team.js"
import { RoomState } from "../room-state.js"
import { ChatMessage } from "./add-chat-message.js"

export function activateTrap(this: RoomState, sessionId: string, trap: string) {
  const playerWhoActivates = this.players[sessionId].username

  const clientTeam = getPlayerTeam(this, sessionId)
  const trapAuthor = this.teams[clientTeam].traps[trap].author

  this.timerIsRunning = false
  this.addToHistoric(`${playerWhoActivates} active un piège. ${trapAuthor} a piégé le mot ${trap.toUpperCase()}.`)
  this.oratorMessages.push(new ChatMessage("Esquive", `${trapAuthor} a piégé le mot ${trap.toUpperCase()}.`))
  this.isJudgingTrap = true
}
