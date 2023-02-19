import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"

export function announceEventualGuessgFailure(this: RoomState, playingTeam: Team) {
  const timerEnded = this.timer === 0
  if (timerEnded) this.teams[playingTeam].hasSucceededGuess = false

  //failure can happen with the end of timer or with no guess that remains
  const playingTeamHasFailed = this.teams[playingTeam].hasSucceededGuess === false
  if (playingTeamHasFailed) {
    const playingTeamColor = this.teams[playingTeam].color

    const opponentTeam = this.getOpponentTeam(playingTeam)
    const secretWord = this.teams[opponentTeam].secretWord.toUpperCase()

    const sentence = `L’auditoire ${playingTeamColor} n’a pas réussi à deviner le mot ${secretWord}.`
    this.addToHistoric(sentence)
  }
}
