import { Team } from "../../../../types/room-state.js"
import { RoomState } from "../room-state.js"
import { ChatMessage } from "./add-chat-message.js"

export function announceEventualGuessgFailure(this: RoomState, playingTeam: Team) {
  const timerEnded = this.timer === 0
  if (timerEnded) this.teams[playingTeam].hasSucceededGuess = false

  //failure can happen with the end of timer or with no guess that remains
  const playingTeamHasFailed = this.teams[playingTeam].hasSucceededGuess === false
  if (playingTeamHasFailed) {
    const opponentTeam = this.getOpponentTeam(playingTeam)
    const secretWord = this.teams[opponentTeam].secretWord.value.toUpperCase()

    const sentence = `Il fallait deviner le mot ${secretWord}.`
    this.addToHistoric(sentence)
    this.oratorMessages.push(new ChatMessage("Esquive", sentence))
  }
}
