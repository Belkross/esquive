import { formatStringWithBasicLetters } from "../../../../functions/format-string-with-basic-letters.js"
import { getPlayerTeam } from "../../../../functions/get-player-team.js"
import { Team } from "../../../../types/room-state.js"
import { ServerManager } from "../../../../types/server.js"
import { RoomState } from "../room-state.js"

export function submitGuess(this: RoomState, server: ServerManager, guess: string) {
  const { sessionId } = server
  const clientUsername = this.players[sessionId].username
  const clientTeam = getPlayerTeam(this, sessionId)
  const opponentTeam = this.getOpponentTeam(clientTeam)
  const secretWord = this.teams[opponentTeam].secretWord.value

  const formattedSecretWord = formatStringWithBasicLetters(secretWord)
  const formattedGuess = formatStringWithBasicLetters(guess)
  const guessIsRight = formattedGuess === formattedSecretWord

  --this.teams[clientTeam].guessAttemptsRemaining

  if (guessIsRight) {
    this.addToHistoric(`${clientUsername} a réussi à deviner le mot ${secretWord.toUpperCase()}.`)
    this.teams[clientTeam].hasSucceededGuess = true
    this.timerIsRunning = false
    this.configureNextRoundPhase()
  } else {
    this.addToHistoric(`${clientUsername} a proposé le mot ${guess.toUpperCase()}.`)
    this.teams[clientTeam].guessAttempts.push(formattedGuess)

    if (noGuessRemaining.call(this, clientTeam)) {
      this.teams[clientTeam].guessAttempts.length = 0 // to avoid the client to play the submit guess sound
      this.teams[clientTeam].hasSucceededGuess = false
      this.timerIsRunning = false
      this.configureNextRoundPhase()
    }
  }
}

function noGuessRemaining(this: RoomState, clientTeam: Team) {
  return this.teams[clientTeam].guessAttemptsRemaining <= 0
}
