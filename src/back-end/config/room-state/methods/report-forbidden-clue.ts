import { RoomState } from "../room-state.js";

export function reportForbiddenClue(this:RoomState, sessionId: string) {
  const clientUsername = this.players[sessionId].username

  this.timerIsRunning = false
  this.addToHistoric(`${clientUsername} signale un indice d’orateur non autorisé.`)
  this.isJudgingTrap = true
}