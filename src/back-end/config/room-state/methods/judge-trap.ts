import { ServerManager } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export function judgeTrap(this: RoomState, server: ServerManager, judgement: boolean) {
  const { io, sessionId } = server
  const clientUsername = this.players[sessionId].username

  if (judgement === true) {
    const playingTeam = this.getPlayingTeam()
    this.teams[playingTeam].hasSucceededGuess = false
    this.addToHistoric(`${clientUsername} a validé.`)
    this.configureNextRoundPhase()
  } else {
    this.startTimer(io)
    this.addToHistoric(`${clientUsername} a refusé.`)
  }

  this.isJudgingTrap = false
}
