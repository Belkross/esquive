import { formatStringWithBasicLetters } from "../../../../functions/format-string-with-basic-letters.js"
import { getClientTeam } from "../../../../functions/get-client-team.js"
import { ServerManager } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export function submitGuess(this: RoomState, server: ServerManager, guess: string) {
  const { sessionId } = server
  const clientUsername = this.players[sessionId].username
  const clientTeam = getClientTeam(this, sessionId)
  const opponentTeam = this.getOpponentTeam(clientTeam)
  const secretWord = this.teams[opponentTeam].secretWord.value

  const formattedSecretWord = formatStringWithBasicLetters(secretWord)
  const formattedGuess = formatStringWithBasicLetters(guess)
  const guessIsRight = formattedGuess === formattedSecretWord

  --this.teams[clientTeam].guessAttemptsRemaining

  if (guessIsRight) {
    this.addToHistoric(`${clientUsername} a réussi à deviner le mot ${secretWord.toUpperCase()}.`)
    this.teams[clientTeam].hasSucceededGuess = true
    this.stopTimer()
    this.configureNextRoundPhase()
  } else {
    this.addToHistoric(`${clientUsername} a proposé le mot ${guess.toUpperCase()}.`)
    this.teams[clientTeam].guessAttempts.push(formattedGuess)

    const noGuessRemaining = this.teams[clientTeam].guessAttemptsRemaining <= 0
    if (noGuessRemaining) {
      this.teams[clientTeam].hasSucceededGuess = false
      this.stopTimer()
      this.configureNextRoundPhase()
    }
  }
}
