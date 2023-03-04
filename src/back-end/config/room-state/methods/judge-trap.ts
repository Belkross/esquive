import { ServerManager } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export function judgeTrap(this: RoomState, server: ServerManager, judgement: boolean) {
  const { io, sessionId } = server
  const clientUsername = this.players[sessionId].username

  if (judgement === true) {
    const playingTeam = this.getPlayingTeam()
    this.teams[playingTeam].hasSucceededGuess = false
    this.teams[playingTeam].trapped = true
    this.addToHistoric(`${clientUsername} valide le piège.`)
    this.configureNextRoundPhase()
  } else {
    this.startTimer(io)
    this.addToHistoric(`${clientUsername} refuse le piège.`)
  }

  this.isJudgingTrap = false
}
